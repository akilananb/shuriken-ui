"use client";
import React, { useState, useEffect, useCallback } from "react";
import { searchColumn } from "@/components/common/Constants/Constant";
import "@/components/common/Bonds/bonds.css";
import InfiniteScrollTable from "@/components/common/infinte_table";
import BackButton from "@/components/common/button/BackButton";
import { BASE_NAME } from "@/config/appConfig";
import Image from "next/image";
import TooltipComponent from "@/components/common/tooltip";
import Spinner from "@/components/common/spinner";
import LtvMetricHeader from "../bonds/LtvMetricHeader";
import {
  toLTVValuesDataBond,
  toSummaryValuesDataBond,
} from "@/components/layout/bonds/mapper";
import {
  toLTVValuesData,
  toSummaryValuesData,
} from "@/components/layout/equity/mapper";

const fetchData = () => {};

const MultiSearchContent = ({ id }) => {
  const [filters, setFilters] = useState({ instrumentType: "ALL" });
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState("");
  const [isMultiLtv, setIsMultiLtv] = useState(true);
  const [failedResults, setFailedResults] = useState([]);

  let callCount = 0;
  const maxDuration = 15 * 60 * 1000;
  const interval = 10 * 1000;
  const maxCalls = maxDuration / interval;

  useEffect(() => {
    if (id) {
      startPolling(id);
    }
  }, [id]);

  const startPolling = (id) => {
    setLoading(true);
    const intervalId = setInterval(() => {
      if (callCount < maxCalls) {
        pollLtvResults(id, intervalId);
        callCount++;
      } else {
        clearInterval(intervalId);
        setLoading(false);
      }
    }, interval);

    setTimeout(() => {
      clearInterval(intervalId);
      setLoading(false);
    }, maxDuration);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "instrumentType" && value === "ALL") {
        const newFilters = { ...prevFilters };
        delete newFilters.instrumentType;
        return newFilters;
      }

      return {
        ...prevFilters,
        [filterType]: value,
      };
    });
  };

  const getButtonStyle = (filterType, value) => {
    if (
      filterType === "instrumentType" &&
      value === "ALL" &&
      !filters.instrumentType
    ) {
      return "asset-override-filter-button-active";
    }
    return filters[filterType] === value
      ? "asset-override-filter-button-active"
      : "asset-override-filter-button";
  };

  const pollLtvResults = useCallback(async (id, intervalId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/shuriken/api/asset-query-svc/api/v1/asset_class_query/v2/ltv/response/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch polling data");
      }

      const data = await response.json();

      if (
        data.status === "COMPLETED" &&
        data.ltvCalculationResults.length > 0
      ) {
        setResultData(data.ltvCalculationResults);
        setLoading(false);
        clearInterval(intervalId);
      } else if (data.status === "FAILED") {
        const failed = data.ltvCalculationResults.filter(
          (item) => item.status === "FAILED"
        );
        setFailedResults(failed);
        setLoading(false);
        setStatusData(data);
        clearInterval(intervalId);
      } else if (data.status !== "COMPLETED" && data.status !== "FAILED") {
        setStatusData(data);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  const filteredResults =
    filters.instrumentType && filters.instrumentType !== "ALL"
      ? resultData.filter((item) => item.assetType === filters.instrumentType)
      : resultData;

  const resultDataExists = resultData.length > 0;
  const { lowestLtvObject, quantity, assetType } = resultDataExists
    ? sortedResult(resultData)
    : {};

  function sortedResult(resultData) {
    let lowestLtvObject = null;
    let lowestLtvValue = 100;
    let result = null;

    resultData?.forEach((item) => {
      let ltvAtIm;
      let hasOverride = false;

      if (item.assetType === "BOND") {
        if (
          item.ltvResponse.ltvCalculation.override &&
          item.ltvResponse.ltvCalculation.override.hasOverride
        ) {
          hasOverride = true;
          ltvAtIm = item.ltvResponse.ltvCalculation.override.ltvAtIm;
        } else {
          ltvAtIm = item.ltvResponse.ltvCalculation.ltvAtIm;
        }
      } else if (item.assetType === "EQUITY") {
        if (
          item.ltvResponse.ltvCalculation.overrideCalculationResult &&
          item.ltvResponse.ltvCalculation.overrideCalculationResult.hasOverride
        ) {
          ltvAtIm =
            item.ltvResponse.ltvCalculation.overrideCalculationResult.ltvAtIm;
          hasOverride = true;
        } else {
          ltvAtIm = item.ltvResponse.ltvCalculation.ltvAtIm;
        }
      } else {
        ltvAtIm = item.ltvResponse.ltvCalculation.ltvAtIm;
      }
      if (hasOverride && ltvAtIm < lowestLtvValue) {
        lowestLtvValue = ltvAtIm;
        result = item;
        lowestLtvObject = item?.ltvResponse;
      } else if (!hasOverride && ltvAtIm < lowestLtvValue) {
        lowestLtvValue = ltvAtIm;
        result = item;
        lowestLtvObject = item?.ltvResponse;
      }
    });

    const assetType = result.assetType;
    const quantity = result.quantity;

    return { lowestLtvObject, assetType, quantity };
  }

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Spinner fullPage={true} statusMessage={statusData.status} />
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between mb-4">
            <div className="flex justify-start items-center gap-6">
              <BackButton />
              <div className="text-24px font-bold">LTV Security Search</div>
            </div>
            <button type="submit" className="asset-add-override-button">
              Update
            </button>
          </div>
          <div className="flex flex-row items-baseline override-filter justify-between mb-6">
            <div className="flex flex-row pr-4 items-center gap-4">
              <div className="font-bold text-base">Result Filters:</div>
              <div className="flex flex-row pr-4 items-center gap-4">
                <button
                  className={getButtonStyle("instrumentType", "ALL")}
                  onClick={() => handleFilterChange("instrumentType", "ALL")}
                >
                  All
                </button>
                <button
                  className={getButtonStyle("instrumentType", "EQUITY")}
                  onClick={() => handleFilterChange("instrumentType", "EQUITY")}
                >
                  Equity
                </button>
                <button
                  className={getButtonStyle("instrumentType", "BOND")}
                  onClick={() => handleFilterChange("instrumentType", "BOND")}
                >
                  Bond
                </button>
                <button
                  className={getButtonStyle("instrumentType", "FUND")}
                  onClick={() => handleFilterChange("instrumentType", "FUND")}
                >
                  Funds
                </button>
                <button
                  className={getButtonStyle("instrumentType", "NOTES")}
                  onClick={() => handleFilterChange("instrumentType", "NOTES")}
                >
                  Notes
                </button>
              </div>
            </div>
            <div className="inline-flex items-center pb-3 gap-4">
              <div className="info-warning inline-flex">
                <TooltipComponent tooltipMsg={"tooltipMsg"}>
                  <Image
                    src={`${BASE_NAME}/static/images/Info.svg`}
                    width="16"
                    height="16"
                    alt="info"
                  />
                </TooltipComponent>
                Override Active
              </div>
            </div>
          </div>
          {statusData.status !== "FAILED" && resultData ? (
            <>
              <InfiniteScrollTable
                fetchData={fetchData}
                columns={searchColumn}
                pageSize={resultData.length}
                filters={filters}
                responseId={id}
                multiLtvData={filteredResults}
                isMultiLtv={isMultiLtv}
              />
              {/* <div className="flex gap-8 justify-end">
            <button className="w-[95px] h-[36px] multi-search-page-buttons ">
              <Image
                src={`${BASE_NAME}/static/images/SendIcon.svg`}
                width="20"
                height="20"
                alt="send"
                className="mr-1"
              />
              Send
            </button>
            <button className="w-[127px] h-[36px] multi-search-page-buttons">
              <Image
                src={`${BASE_NAME}/static/images/Download.svg`}
                width="20"
                height="20"
                alt="download"
                className="mr-1"
              />
              Download
            </button>
          </div> */}
              <div className="flex flex-wrap gap-8 w-full mr-8 mt-6">
                {assetType === "BOND" && (
                  <LtvMetricHeader
                    ltvData={toLTVValuesDataBond(lowestLtvObject, isMultiLtv)}
                    metricsData={toSummaryValuesDataBond(
                      lowestLtvObject,
                      quantity,
                      isMultiLtv
                    )}
                  />
                )}

                {assetType === "EQUITY" && (
                  <LtvMetricHeader
                    ltvData={toLTVValuesData(lowestLtvObject, isMultiLtv)}
                    metricsData={toSummaryValuesData(lowestLtvObject, quantity)}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center min-h-screen flex-col">
                <div className="text-center">{statusData.status}</div>
                <div>{statusData.statusMessage}</div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MultiSearchContent;
