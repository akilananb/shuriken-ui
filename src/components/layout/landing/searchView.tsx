"use client";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import Link from "next/link";
import ToggleButton from "@/components/common/toggleButton";
import { useState } from "react";
import { LTVSearch } from "@/types/search.types";

export default function SearchView() {
  const [selectedItem, setSelectedItem] = useState<LTVSearch | null>();
  const [quantity, setQuantity] = useState<string>("");

  const classValue = () => {
    if (selectedItem != null) return "primary-button";
    else return `primary-button-disable`;
  };

  const isin = selectedItem?.isin;
  const securityType = selectedItem?.securityType;
  const quantityParam = ![null, ""].includes(quantity)
    ? `&quantity=${quantity}`
    : "";

  const href = `/bonds?isin=${isin}&securityType=${securityType}${quantityParam}`;

  return (
    <div className="flex flex-col gap-8 bg-white h-full justify-center items-center">
      <div className="flex gap-2  self-streach relative">
        <LTVSearchInput
          className="w-[565px]"
          value={selectedItem?.isin}
          onSelectedItem={(selectedItem) => {
            setSelectedItem(selectedItem);
          }}
        />
        <InputComponent
          className="w-[167px] "
          placeholder="Quantity (Optional)"
          inputtype="NUMBER_WITH_COMMA"
          onChangeListener={(value) => {
            setQuantity(value);
          }}
        />
      </div>

      <ToggleButton title="Multiple Security Search" />
      <div>
        <Link href={href} className={classValue()}>
          Search
        </Link>
      </div>
    </div>
  );
}
