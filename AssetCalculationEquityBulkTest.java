package com.nomura.shuriken.assetquerysvc.bulk;

import com.nomura.shuriken.assetquerysvc.dto.TakaraSecurityBondResponse;
import com.nomura.shuriken.assetquerysvc.repository.entities.SecurityEquityDetail;
import org.apache.commons.csv.CSVFormat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.condition.EnabledIfSystemProperty;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class AssetCalculationEquityBulkTest {

    private static final String CSV_FILE_PATH = "results.csv";
    private RestTemplate restTemplate;

    /* Change processCsvInput as mentioned below for re-running tests which failed because of UMD latency issue
     * Copy CSV_FILE_PATH at mocks/mappings/staleData/<newName>.csv and Change file path at line # 35
     * update filter condition as record -> record.get("ERROR").equals("418-Data Not Available")
     * */
    static Stream<Arguments> processCsvInput() throws Exception {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(
                new ClassPathResource("mocks/mappings/staleData/run1.csv").getInputStream(),
                StandardCharsets.UTF_8))) {
            return CSVFormat.DEFAULT
                    .withFirstRecordAsHeader()
                    .withDelimiter(',')
                    .withTrim()
                    .parse(fileReader).getRecords().stream()
                    .filter(record -> record.get("ERROR").equals("418-Data Not Available"))
                    .map(record -> Arguments.of(
                            record.get("ISIN"),
                            Integer.parseInt(record.get("Quantity").replaceAll(",", "")),
                            record.get("Equity Financing up to LP10")
                    ));
        }
    }

    @BeforeEach
    void setUp() {
        restTemplate = new RestTemplate();
    }

    @ParameterizedTest
    @MethodSource("processCsvInput")
    @EnabledIfSystemProperty(named = "env", matches = "local")
    void testWithCsvSource(String isin, int quantity, String fullEqtyFinancing)
            throws IOException {

        SecurityEquityDetail securityEquityDetail = null;
        DecimalFormat df = new DecimalFormat("#.##");
        int writeMode = 0;
        double actualLtv = 0;
        String pdpId = "";
        String url = String.format(
                "http://wm-shuriken-sit.sdc-ako-dev.gslb4.nomura.com/shuriken/api/asset-query-svc/api/v1/asset_class_query/search/%s", isin);
        TakaraSecurityBondResponse globalSearchResponse = restTemplate.getForObject(url, TakaraSecurityBondResponse.class);
        if (globalSearchResponse.size() == 1) {
            pdpId = globalSearchResponse.payLoad().get(0).pdpId();
            url = String.format(
                    "http://wm-shuriken-sit.sdc-ako-dev.gslb4.nomura.com/shuriken/api/asset-query-svc/api/v1/asset_class_query/ltv/equity?pdpId=%s&quantity=%d", pdpId, quantity);
            try {
                securityEquityDetail = restTemplate.getForObject(url, SecurityEquityDetail.class);
                actualLtv = securityEquityDetail.getLtvCalculation().getLtvAtIm();
                writeMode = 1;
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode().equals(HttpStatus.I_AM_A_TEAPOT)) {
                    writeMode = 2;
                }
            }
        } else {
            writeMode = 3;
        }
        File file = new File(CSV_FILE_PATH);
        boolean writeHeader = !file.exists() || file.length() == 0;
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, true))) {
            if (writeHeader) {
                bw.write(
                        "ISIN,PDPID,Quantity,Actual LTV@IM, Equity Financing up to LP10,ERROR");
                bw.newLine();
            }

            if (writeMode == 1) {
                bw.write(isin + "," + pdpId + "," + quantity + "," + String.valueOf(actualLtv) + "," + Double.parseDouble(fullEqtyFinancing.replace("%", "")) + "," + "NA");
            } else if (writeMode == 2) {
                bw.write(isin + "," + pdpId + "," + quantity + "," + "Not Determined" + "," + Double.parseDouble(fullEqtyFinancing.replace("%", "")) + "," + "418-Data Not Available");
            } else {
                bw.write(isin + "," + "Not Determined" + "," + quantity + "," + "Not Determined" + "," + Double.parseDouble(fullEqtyFinancing.replace("%", "")) + "," + "Multiple or Zero records found in global search");
            }
            bw.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }

        assertNotNull(securityEquityDetail);
        assertEquals(Double.parseDouble(fullEqtyFinancing.replace("%", "")), actualLtv);
    }
}
