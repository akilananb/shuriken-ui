"use client";
import Link from "next/link";
import ToggleButton from "@/components/common/toggleButton";
import { useState } from "react";
import { LTVSearch } from "@/types/search.types";
import SingleLtvSearch from "./singleLtvSearch";
import MultiLtvSearch from "./multiLtvSearch";
import { BASE_NAME } from "@/config/appConfig";
import { getUrl } from "@/_utils/stringUtils";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function SearchView() {
  const [selectedItem, setSelectedItem] = useState<LTVSearch | null>();
  const [quantity, setQuantity] = useState<string>("");
  const [isMultisearch, setMultisearch] = useState(false);
  const [inputItems, setInputItems] = useState(false);
  const [values, setValues] = useState([]);

  const classValue = () => {
    if (selectedItem != null || inputItems != null) {
      if (isMultisearch && (!values || values.length === 0 || !inputItems)) {
        return "primary-button-disable block";
      } else {
        return "primary-button block";
      }
    } else {
      return `primary-button-disable block`;
    }
  };

  const pdpId = selectedItem?.pdpId ?? "";
  const securityType = selectedItem?.securityType ?? "";
  const quantityParam = ![null, ""].includes(quantity)
    ? `&quantity=${quantity}`
    : "";

  const handleDataChange = (data) => {
    const allItemsHaveQty = data.every(
      (item) =>
        item.ltvSearchValue !== undefined &&
        item.ltvSearchValue !== "" &&
        item.ltvSearchValue !== null
    );
    setValues(data);
    setInputItems(allItemsHaveQty);
  };

  function extractValues(valueKey) {
    return values
      .map((item) => {
        const keys = valueKey.split(".");
        let nestedValue = item;
        for (const key of keys) {
          nestedValue = nestedValue[key];
          if (nestedValue === undefined) return "";
        }
        return nestedValue;
      })
      .filter((value) => value !== "")
      .join(",");
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `/shuriken/api/asset-query-svc/api/v1/ltv/process/multiple/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      return response;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `/shuriken/api/asset-query-svc/api/v1/asset_class_query/multi-search/sample`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleMultiSearchClick = async () => {
    const pdpId = extractValues("ltvSearchValue.pdpId");
    const securityType = extractValues("ltvSearchValue.securityType");
    const quantity = extractValues("quantity");

    const queryObject = await createQueryObject(pdpId, securityType, quantity);

    try {
      const response = await fetch(
        `/shuriken/api/asset-query-svc/api/v1/asset_class_query/v2/ltv/process`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queryObject),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      window.open(
        `${BASE_NAME}/multi-search?responseId=${data.responseId}`,
        "_blank"
      );
    } catch (error) {
      console.error(error);
    }
  };

  const createQueryObject = async (
    pdpId: string,
    securityType: string,
    quantity: string
  ) => {
    const pdpIds = pdpId.split(",");
    const securityTypes = securityType.split(",");

    interface QueryObject {
      id: string;
      quantity: number;
      assetType: string;
    }

    const output = {
      query: [] as QueryObject[],
      requestId: uuidv4(),
    };

    pdpIds.forEach((id, index) => {
      const securityType = securityTypes[index].toUpperCase();
      const assetType = securityType === "BOND" ? "BOND" : "EQUITY";

      output.query.push({
        id: id,
        quantity: quantity ? parseInt(quantity) : 0,
        assetType: assetType,
      });
    });

    return output;
  };

  return (
    <div className="flex flex-col gap-8 bg-white h-full justify-center items-center">
      <div className="flex flex-col gap-4">
        {isMultisearch ? (
          <MultiLtvSearch onChangeListener={handleDataChange} />
        ) : (
          <SingleLtvSearch
            onSelectedItem={(selectedItem) => {
              setSelectedItem(selectedItem);
            }}
            onChangeListener={(value) => {
              setQuantity(value);
            }}
            pdpId={pdpId}
            value={selectedItem?.isin}
            quantity={quantity}
          />
        )}
      </div>
      <ToggleButton
        title="Multiple Security Search"
        onCheckListener={(isSelected) => {
          setMultisearch(isSelected);
        }}
      />
      <div>
        {isMultisearch ? (
          <button onClick={handleMultiSearchClick} className={classValue()}>
            Search
          </button>
        ) : (
          <Link
            href={getUrl(securityType, pdpId, quantityParam)}
            target="_blank"
            className={classValue()}
          >
            Search
          </Link>
        )}
      </div>
      {isMultisearch ? (
        <>
          {" "}
          <Divider sx={{ borderStyle: "dashed" }}>or</Divider>
          <Box
            component="section"
            sx={{
              p: 2,
              border: "1px dashed grey",
              borderRadius: "10px",
              width: "617px",
              height: "100px",
            }}
          >
            <div className="flex flex-row items-center mt-3">
              <Image
                src={`${BASE_NAME}/static/images/CloudIcon.svg`}
                alt="cloud icon"
                width="32"
                height="32"
              />
              <div className="mr-6 ml-6">
                <p>
                  Upload an Excel file with Security ID and optional Quantity
                </p>
                <p
                  onClick={handleDownload}
                  className="text-sm text-gray-400 underline cursor-pointer"
                >
                  Download a sample file here
                </p>
              </div>

              <button className="w-[127px] h-[36px] multi-search-page-buttons font-medium">
                <label className="flex items-center cursor-pointer">
                  <Image
                    src={`${BASE_NAME}/static/images/BrowseFolder.svg`}
                    width="20"
                    height="20"
                    alt="download"
                    className="mr-1"
                  />
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </button>
            </div>
          </Box>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
