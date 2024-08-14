package com.nomura.shuriken.assetquerysvc.handler.marketdata;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nomura.shuriken.assetquerysvc.dto.MultiUmdUploadRequestInput;
import com.nomura.shuriken.assetquerysvc.dto.takara.TakaraSecurityDetail;
import com.nomura.shuriken.assetquerysvc.enums.AssetTypes;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.camunda.bpm.engine.variable.VariableMap;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
@AllArgsConstructor
@ExternalTaskSubscription(topicName = "transformToMktDataReq")
public class TransformToMktDataRequestHandler implements ExternalTaskHandler {

    private final ObjectMapper objectMapper;

    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        List<TakaraSecurityDetail> pdpIds = externalTask.getVariable("pdpIds");
        List<MultiUmdUploadRequestInput> multiUmdUploadRequestInputs = externalTask.getVariable("multiUmdUploadRequest");

        Map<String, TakaraSecurityDetail> isinMap = pdpIds.stream()
                .filter(r -> r.isin() != null)
                .collect(Collectors.toMap(TakaraSecurityDetail::isin, r -> r, (existing, replacement) -> existing));
        
        Map<String, TakaraSecurityDetail> tickerExchangeMap = pdpIds.stream()
                .filter(r -> r.ticker() != null && r.exchange() != null)
                .collect(Collectors.toMap(r -> r.ticker() + "_" + r.exchange(), r -> r, (existing, replacement) -> existing));

        Set<MultiUmdUploadRequestInput> missingAssetsForPdpId = new HashSet<>();
        Set<String> queryBond = new HashSet<>();
        Set<String> queryEquity = new HashSet<>();
        Map<String, TakaraSecurityDetail> securityData = new HashMap<>();

        multiUmdUploadRequestInputs.forEach(v -> {
            switch (v.getAssetType()) {
                case BOND -> {
                    if (v.getIsin() != null) {
                        TakaraSecurityDetail bond = isinMap.get(v.getIsin());
                        if (bond != null && AssetTypes.BOND.name().equalsIgnoreCase(bond.securityType())) {
                            queryBond.add(bond.pdpId());
                            securityData.put(bond.pdpId(), bond);
                        } else {
                            missingAssetsForPdpId.add(v);
                        }
                    } else {
                        missingAssetsForPdpId.add(v);
                    }
                }
                case EQUITY -> {
                    TakaraSecurityDetail equity = null;
                    if (v.getIsin() != null) {
                        equity = isinMap.get(v.getIsin());
                    }
                    if (equity == null && v.getTicker() != null && v.getExchange() != null) {
                        equity = tickerExchangeMap.get(v.getTicker() + "_" + v.getExchange());
                    }
                    if (equity != null && AssetTypes.EQUITY.name().equalsIgnoreCase(equity.securityType())) {
                        queryEquity.add(equity.pdpId());
                        securityData.put(equity.pdpId(), equity);
                    } else {
                        missingAssetsForPdpId.add(v);
                    }
                }
                default -> missingAssetsForPdpId.add(v);
            }
        });

        HashMap<AssetTypes, List<String>> mktDataRequest = new LinkedHashMap<>();
        mktDataRequest.put(AssetTypes.BOND, new ArrayList<>(queryBond));
        mktDataRequest.put(AssetTypes.EQUITY, new ArrayList<>(queryEquity));

        VariableMap processVariable = Variables.createVariables()
                .putValue("missingAssetsForPdpId", Variables.objectValue(new ArrayList<>(missingAssetsForPdpId))
                        .serializationDataFormat(Variables.SerializationDataFormats.JSON)
                        .create())
                .putValueTyped("mktDataRequest", Variables.objectValue(mktDataRequest)
                        .serializationDataFormat(Variables.SerializationDataFormats.JSON)
                        .create())
                .putValueTyped("securityData", Variables.objectValue(securityData)
                        .serializationDataFormat(Variables.SerializationDataFormats.JSON)
                        .create());

        externalTaskService.complete(externalTask, processVariable);
    }
}
