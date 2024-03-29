"use client";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import Link from "next/link";
import { useState } from "react";
import { LTVSearch } from "@/types/search.types";
import { BondsChildProps } from "./types";
const SearchView: React.FC<BondsChildProps> = (props: BondsChildProps) => {
  const { quantity, isin, securityType } = props;
  const [selectedItem, setSelectedItem] = useState<LTVSearch | null>();
  const [_quantity, setQuantity] = useState<string>(quantity?.toString() ?? "");

  const classValue = () => {
    const numericQuantity = quantity !== undefined ? quantity : 0;
    const numeric_Quantity = _quantity !== "" ? Number(_quantity) : NaN;

    if (selectedItem != null) {
      return "primary-button flex-none w-[167px]";
    } else if (
      !isNaN(numeric_Quantity) &&
      numericQuantity !== numeric_Quantity
    ) {
      return "primary-button flex-none w-[167px]";
    } else {
      return `primary-button-disable flex-none w-[167px]`;
    }
  };

  const quantityParam = ![null, ""].includes(_quantity)
    ? `&quantity=${_quantity}`
    : "";

  const href = `/bonds?isin=${selectedItem?.isin || isin}&securityType=${
    selectedItem?.securityType || securityType
  }${quantityParam}`;

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
      <Link href={href} className={classValue()} replace>
        Update
      </Link>
    </div>
  );
};
export default SearchView;
