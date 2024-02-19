"use client";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import Link from "next/link";
import { useState } from "react";
import { LTVSearch } from "@/types/search.types";
import { BondsChildProps } from "./types";
const SearchView: React.FC<BondsChildProps> = (props: BondsChildProps) => {
  const { quantity, isin } = props;
  const [selectedItem, setSelectedItem] = useState<LTVSearch | null>();
  const [_quantity, setQuantity] = useState<string>(quantity ?? "");

  const classValue = () => {
    if (selectedItem != null) return "primary-button flex-none w-[167px]";
    else return `primary-button-disable flex-none w-[167px]`;
  };

  return (
    <div className="flex gap-2 w-1/2">
      <LTVSearchInput
        className="w-full grow"
        value={isin}
        onSelectedItem={(selectedItem) => {
          setSelectedItem(selectedItem);
        }}
      />
      <InputComponent
        value={_quantity}
        className="flex-none w-[167px]"
        placeholder="Quantity (Optional)"
        inputtype="NUMBER_WITH_COMMA"
        onChangeListener={(value) => {
          setQuantity(value);
        }}
      />
      <Link
        href={`/bonds?isin=${selectedItem?.isin}&securityType=${
          selectedItem?.securityType
        }${![null, ""].includes(_quantity) ? `&quantity=${_quantity}` : ""}`}
        className={classValue()}
        replace
      >
        Update
      </Link>
    </div>
  );
};
export default SearchView;
