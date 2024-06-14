"use client";
import React, { useState, useEffect, useCallback } from "react";
import { searchColumn } from "@/components/common/Constants/Constant";
import { actionItems, multiSearchActionItems } from "./searchView.const";
import "@/components/common/Bonds/bonds.css";
import InfiniteScrollTable from "@/components/common/infinte_table";
import BackButton from "@/components/common/button/BackButton";
import { BASE_NAME } from "@/config/appConfig";
import Image from "next/image";
import TooltipComponent from "@/components/common/tooltip";
import Spinner from "@/components/common/spinner";

const fetchData = () => {};

const MultiSearchContent = ({ id }) => {
  const [filters, setFilters] = useState({
    overrideStatus: "ACTIVE",
  });
  const [reloadTable, setReloadTable] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState("");

  useEffect(() => {
    if (id) {
      pollLtvResults(id);
    }
  }, [id]);

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

  const pollLtvResults = useCallback(async (id) => {
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
        setResult(data.ltvCalculationResults);
        setLoading(false);
      } else if (data.status === "FAILED") {
        setLoading(false);
        setStatusData(data);
      } else if (data.status !== "COMPLETED" && data.status !== "FAILED") {
        setStatusData(data);
        setTimeout(() => pollLtvResults(id), 60000);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-start items-center gap-6">
          <BackButton />
          <div className="text-24px font-bold">LTV Security Search</div>
        </div>
        {/* <button type="submit" className="asset-add-override-button">
          Update
        </button> */}
      </div>
      <div className="flex flex-row items-baseline override-filter justify-between">
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
                src={`${BASE_NAME}/static/images/info.svg`}
                width="16"
                height="16"
                alt="info"
              />
            </TooltipComponent>
            Override Active
          </div>
        </div>
      </div>
      {statusData.status !== "FAILED" ? (
        <InfiniteScrollTable
          fetchData={fetchData}
          columns={searchColumn}
          pageSize={result.length}
          filters={filters}
          initialData={""}
          multiLtvData={result}
          reload={reloadTable}
          isMultiLtv={true}
          actionItems={multiSearchActionItems}
          actionOnClick={(actionType, instrumentId) => {
            switch (actionType) {
              case "Delete": {
                setInstrumentId(instrumentId);
                break;
              }
            }
          }}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">{statusData.statusMessage}</div>
        </div>
      )}

      <div className="flex gap-8 justify-end">
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
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Spinner fullPage={true} />
            <span>{statusData.status}</span>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MultiSearchContent;
