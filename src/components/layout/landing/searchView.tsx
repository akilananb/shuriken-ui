"use client";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import Link from "next/link";
import ToggleButton from "@/components/common/toggleButton";
import { useState } from "react";
import { LTVSearch } from "@/types/search.types";
import { getUrl } from "@/_utils/stringUtils";

export default function SearchView() {
  const [selectedItem, setSelectedItem] = useState<LTVSearch | null>();
  const [quantity, setQuantity] = useState<string>("");

  const classValue = () => {
    if (selectedItem != null) return "primary-button";
    else return `primary-button-disable`;
  };

  const pdpId = selectedItem?.pdpId ?? "";
  const securityType = selectedItem?.securityType ?? "";
  const quantityParam = ![null, ""].includes(quantity)
    ? `&quantity=${quantity}`
    : "";

  return (
    <div className="flex flex-col gap-8 bg-white h-full justify-center items-center">
      <div className="flex gap-2  self-streach relative">
        <LTVSearchInput
          pdpId={pdpId}
          className="w-[565px]"
          value={selectedItem?.isin}
          onSelectedItem={(selectedItem) => {
            setSelectedItem(selectedItem);
          }}
          quantity={quantity}
          isUpdate={false}
          disabled={false}
        />
        <InputComponent
          className="w-[167px] "
          placeholder="Quantity (Optional)"
          inputtype="NUMBER_WITH_COMMA"
          onChangeListener={(value) => {
            setQuantity(value);
          }}
          selectedItem={{ pdpId: pdpId, securityType: securityType }}
          isUpdate={false}
        />
      </div>

      <ToggleButton title="Multiple Security Search" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedItem != null ? (
          <Link
            href={getUrl(securityType, pdpId, quantityParam)}
            className={classValue()}
            target="_blank"
          >
            Search
          </Link>
        ) : (
          <button className={classValue()}>Search</button>
        )}
      </div>
    </div>
  );
}
