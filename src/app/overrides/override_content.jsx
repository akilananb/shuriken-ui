"use client";
import React, { useState } from "react";
import columns from "@/components/common/Constants/Constant";
import InfiniteScrollTable from "@/components/common/infinte_table";
import { filtersToQueryString } from "@/_utils/helper";
import AddOverridePopup from "@/components/layout/add_override_popup";

export const fetchData = async (page, pageSize, filters) => {


  let url = `/api/v1/instrument-override?page=${
    page === 1 ? 0 : (page - 1) * pageSize
  }&size=${pageSize}`;

  if (filters && Object.keys(filters).length > 0) {
    url += "&" + filtersToQueryString(filters);
  }

  const response = await fetch(url, { cache: "no-store" });

  return response.json();
};

const OverrideContent = ({ intialData }) => {
  const [filters, setFilters] = useState({
    overrideStatus: "ACTIVE",
  });
  const [ reloadTable , setReloadTable ] = useState(false);


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

  return (
    <>
      <div className="flex justify-between">
        <div className="text-justify font-sans text-xl font-bold">
          Overrides
        </div>
        <AddOverridePopup onChange={() => setReloadTable(true)}/>
      </div>
      <div className="flex flex-row items-baseline override-filter">
        <div className="flex flex-row pr-4 items-center gap-4">
          <div className="font-bold text-base">Filters:</div>
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
          </div>
          <div className="w-px h-8 bg-gray-500"></div>
          <div className="flex flex-row pr-4 items-center gap-4">
            <button
              className={getButtonStyle("overrideStatus", "ACTIVE")}
              onClick={() => handleFilterChange("overrideStatus", "ACTIVE")}
            >
              Active
            </button>
            <button
              className={getButtonStyle("overrideStatus", "IN_ACTIVE")}
              onClick={() => handleFilterChange("overrideStatus", "IN_ACTIVE")}
            >
              InActive
            </button>
          </div>
        </div>
      </div>
      <InfiniteScrollTable
        fetchData={fetchData}
        columns={columns}
        pageSize={100}
        filters={filters}
        initialData={intialData}
        reload={reloadTable}
      />
    </>
  );
};

export default OverrideContent;
