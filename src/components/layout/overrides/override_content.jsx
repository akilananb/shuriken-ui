"use client";
import React, { useState } from "react";
import columns from "@/components/common/Constants/Constant";
import { actionItems } from "./overrides.const";
import Modal from "@/components/common/modal";
import useModal from "@/hooks/useModal";

import InfiniteScrollTable from "@/components/common/infinte_table";
import { filtersToQueryString } from "@/_utils/helper";
import TextField from "@mui/material/TextField";
import AddOverridePopup from "@/components/layout/add_override_popup";
import { debounce } from "@mui/material/utils";

export const fetchData = async (page, pageSize, filters, searchKey) => {
  let url = `/shuriken/api/asset-query-svc/api/v1/instrument-override?page=${
    page - 1
  }&size=${pageSize}`;

  if (filters && Object.keys(filters).length > 0) {
    url += "&" + filtersToQueryString(filters);
  }

  if (searchKey) {
    url += `&searchKey=${encodeURIComponent(searchKey)}`;
  }
  const response = await fetch(url, { cache: "no-store" });

  return response.json();
};

export const fetchDeleteData = async (instrumentId) => {
  let url = `/shuriken/api/asset-query-svc/api/v1/instrument-override/${instrumentId}`;
  await fetch(url, { cache: "no-store", method: "DELETE" });
};

const OverrideContent = ({ intialData }) => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [instrumentId, setInstrumentId] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [filters, setFilters] = useState({
    overrideStatus: "ACTIVE",
  });
  const [reloadTable, setReloadTable] = useState("");
  const [searchKey, setSearchKey] = useState("");

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

  const handlePopupClose = () => {
    setRowData(null);
  };
  const handleSearch = debounce((value) => {
    setSearchKey(value);
  }, 400);

  return (
    <>
      <div className="flex justify-between">
        <div className="text-justify font-sans text-xl font-bold">
          Overrides
        </div>
        <AddOverridePopup
          onChange={() => setReloadTable(new Date().toISOString())}
          initialData={rowData}
          onClose={handlePopupClose}
        />
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
          <div>
            <TextField
              placeholder="Search Override"
              className="w-[565px] !h-[50px]"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D1D3D4",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D1D3D4",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D1D3D4",
                  },
                },
              }}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
        </div>
      </div>
      <InfiniteScrollTable
        fetchData={fetchData}
        columns={columns}
        pageSize={20}
        filters={filters}
        searchKey={searchKey}
        initialData={intialData}
        reload={reloadTable}
        actionItems={actionItems}
        actionOnClick={(actionType, instrumentId, row) => {
          console.log("finally inside call back");
          switch (actionType) {
            case "Edit": {
              setRowData(row);
              break;
            }
            case "Delete": {
              setInstrumentId(instrumentId);
              openModal();
              break;
            }
            default: {
              break;
            }
          }
        }}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={"Alert"}>
        <div className="flex flex-col gap-2 ">
          <p className="text-gray-600 mt-2 text-lg p-2">
            Do you want to delete this record?
          </p>

          <div className="flex flex-row gap-2 ">
            <button
              className="secondary-button"
              onClick={() => {
                closeModal();
              }}
            >
              No
            </button>

            <button
              className="primary-button"
              onClick={() => {
                fetchDeleteData(instrumentId).then(() => {
                  setReloadTable(new Date().toISOString());
                  closeModal();
                  setInstrumentId("");
                });
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OverrideContent;
