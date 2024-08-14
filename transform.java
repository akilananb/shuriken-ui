package com.nomura.shuriken.assetquerysvc.handler.marketdata;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nomura.shuriken.assetquerysvc.dto.MultiUmdUploadRequestInput;
import com.nomura.shuriken.assetquerysvc.dto.takara.TakaraSecurityDetail;
import com.nomura.shuriken.assetquerysvc.enums.AssetTypes;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.camunda.bpm.engine.variable.VariableMap;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
@ExternalTaskSubscription(topicName = "transformToMktDataReq")
public class TransformToMktDataRequestHandler implements ExternalTaskHandler {

    private final ObjectMapper objectMapper;

    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        List<TakaraSecurityDetail> pdpIds = externalTask.getVariable("pdpIds");
        List<MultiUmdUploadRequestInput> multiUmdUploadRequestInputs =
                externalTask.getVariable("multiUmdUploadRequest");
        List<MultiUmdUploadRequestInput> missingAssetsForPdpId = new ArrayList<>();
        List<String> queryBond = new ArrayList<>();
        List<String> queryEquity = new ArrayList<>();
        Map<String, TakaraSecurityDetail> securityData = new HashMap<>();
        multiUmdUploadRequestInputs.forEach(v -> {
            switch (v.getAssetType()) {
                case BOND -> {
                    if (v.getIsin() != null) {
                        Optional<TakaraSecurityDetail> bond =
                                pdpIds.stream().filter(r -> r.isin() != null).filter(r -> r.isin().equalsIgnoreCase(v.getIsin())
                                        && r.securityType().equalsIgnoreCase(AssetTypes.BOND.name())).findFirst();
                        if (bond.isPresent()) {
                            queryBond.add(bond.get().pdpId());
                            securityData.put(bond.get().pdpId(), bond.get());
                        } else {
                            missingAssetsForPdpId.add(v);
                        }
                    } else {
                        missingAssetsForPdpId.add(v);
                    }
                }
                case EQUITY -> {
                    Optional<TakaraSecurityDetail> equity =
                            pdpIds.stream().filter(r -> ((r.isin() != null && r.isin().equalsIgnoreCase(v.getIsin())
                                            || (r.ticker() != null && r.ticker().equalsIgnoreCase(v.getTicker())
                                            && r.exchange() != null && r.exchange().equalsIgnoreCase(v.getExchange())))
                                            && r.securityType().equalsIgnoreCase(AssetTypes.EQUITY.name())))
                                    .findFirst();
                    if (equity.isPresent()) {
                        queryEquity.add(equity.get().pdpId());
                        securityData.put(equity.get().pdpId(), equity.get());
                    } else {
                        missingAssetsForPdpId.add(v);
                    }
                }
                default -> {
                    missingAssetsForPdpId.add(v);
                }
            }
        });
        HashMap<AssetTypes, List<String>> mktDataRequest = new LinkedHashMap<>();
        mktDataRequest.put(AssetTypes.BOND, queryBond.stream().toList());
        mktDataRequest.put(AssetTypes.EQUITY, queryEquity.stream().toList());

        VariableMap processVariable = Variables.createVariables()
                .putValue("missingAssetsForPdpId", Variables.objectValue(missingAssetsForPdpId)
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
