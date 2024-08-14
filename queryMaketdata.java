package com.nomura.shuriken.assetquerysvc.handler.marketdata;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nomura.shuriken.assetquerysvc.component.MarketDataClient;
import com.nomura.shuriken.assetquerysvc.dto.AsyncQueryProfileResponse;
import com.nomura.shuriken.assetquerysvc.enums.AssetTypes;
import com.nomura.shuriken.assetquerysvc.error.AssetClassQueryError;
import com.nomura.shuriken.assetquerysvc.handler.exception.HandlerErrorCodes;
import com.nomura.shuriken.assetquerysvc.handler.helper.HandlerUtils;
import com.nomura.shuriken.assetquerysvc.repository.MultiUmdUploadResponseRepository;
import com.nomura.shuriken.assetquerysvc.repository.entities.MultiUmdUploadResponseEntity;
import com.nomura.shuriken.shared.errorutils.errors.ApiException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
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
@ExternalTaskSubscription(topicName = "queryMarketDataRequest")
public class QueryMarketDataRequestHandler implements ExternalTaskHandler {

    private final MarketDataClient marketDataClient;
    private final MultiUmdUploadResponseRepository umdUploadResponseRepository;

    private static final ObjectMapper objMapper = new ObjectMapper();

    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        log.info("Processing market data request for task {}", externalTask.getId());
        String requestId = "";
        boolean isMarketDataFromDb = false;
        try {
            Map<AssetTypes, List<String>> mktDataRequest = HandlerUtils.getMktDataReqObj(externalTask);
            Map<AssetTypes, String> secWiseAsyncReponseId = new HashMap<>();
            Map<AssetTypes, Map<String, JsonNode>> secWiseMarketData = new HashMap<>();
            requestId = externalTask.getVariable("requestId");
            for (Map.Entry<AssetTypes, List<String>> entry : mktDataRequest.entrySet()) {

                List<String> notCached = new ArrayList<>();
                Map<String, JsonNode> cachedResponse = new HashMap<>();
                List<MultiUmdUploadResponseEntity> combinedResponseEntities = new ArrayList<>();
                List<String> pdpIds = entry.getValue();
                int chunkSize = 2000;
                for (int i = 0; i < pdpIds.size(); i += chunkSize) {
                    List<String> chunk = pdpIds.subList(i, Math.min(i + chunkSize, pdpIds.size()));
                    List<MultiUmdUploadResponseEntity> responseEntities =
                            umdUploadResponseRepository.findByPdpIdInAndCreatedDate(chunk, new Date());
                    combinedResponseEntities.addAll(responseEntities);
                }

                if (combinedResponseEntities != null) {
                    cachedResponse = combinedResponseEntities.stream()
                            .collect(Collectors.toMap(MultiUmdUploadResponseEntity::getId,
                                    v -> {
                                        try {
                                            return objMapper.readTree(v.getMarketData().toString());
                                        } catch (JsonProcessingException e) {
                                            log.error("Error parsing object ltvSecurityRequest", e);
                                            externalTaskService.handleBpmnError(externalTask,
                                                    HandlerErrorCodes.JSON_PARSING_ERROR.name());
                                            return null;
                                        }
                                    }));
                    List<String> pdpIdsNotFoundInResponse = new ArrayList<>(entry.getValue());
                    pdpIdsNotFoundInResponse.removeAll(
                            combinedResponseEntities.stream().map(MultiUmdUploadResponseEntity::getPdpId).toList());
                    notCached.addAll(pdpIdsNotFoundInResponse);
                }
                if (!cachedResponse.isEmpty()) {
                    secWiseMarketData.put(entry.getKey(), cachedResponse);
                    isMarketDataFromDb = true;
                }

                if (!notCached.isEmpty()) {
                    AsyncQueryProfileResponse asyncQueryProfileResponse =
                            fetchMarketDataByMultiplePdpIds(entry.getKey(), notCached);

                    secWiseAsyncReponseId.put(entry.getKey(), asyncQueryProfileResponse.responseId());
                }
                log.info("Market data request completed for task {}", externalTask.getId());
            }
            VariableMap processResult = Variables.createVariables()
                    .putValue("isMarketDataFromDb", isMarketDataFromDb)
                    .putValueTyped("ltvMarketDataResponseIds", HandlerUtils.toObjectValue(secWiseAsyncReponseId));
            if (!secWiseMarketData.isEmpty()) {
                processResult.putValueTyped("securityMarketData", HandlerUtils.toObjectValue(secWiseMarketData));
            }
            externalTaskService.complete(externalTask, processResult);
        } catch (JsonProcessingException e) {
            log.error("Error parsing object ltvSecurityRequest", e);
            externalTaskService.handleBpmnError(externalTask, HandlerErrorCodes.JSON_PARSING_ERROR.name());
        } catch (ApiException e) {
            log.error("API exception encountered for request id {}: {}", requestId, e.getMessage());
            externalTaskService.handleBpmnError(externalTask, HandlerErrorCodes.MARKET_DATA_API_ERROR.name(),
                    e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error processing market data request for request id {}: {}",
                    requestId,
                    e.getMessage());
            externalTaskService.handleBpmnError(externalTask, HandlerErrorCodes.MARKET_DATA_API_ERROR.name(),
                    e.getMessage());
            externalTaskService.handleFailure(externalTask, HandlerErrorCodes.MARKET_DATA_FETCH_FAILED.name(),
                    e.getMessage(),
                    0,
                    0);
        }
    }

    private AsyncQueryProfileResponse fetchMarketDataByMultiplePdpIds(AssetTypes assetType,
                                                                      List<String> pdpIds) {
        return marketDataClient.asyncQueryByProfile(assetType, pdpIds)
                .filter(ObjectUtils::isNotEmpty)
                .orElseThrow(() -> new ApiException(AssetClassQueryError.UMD_FETCH_FAILED));
    }
}
