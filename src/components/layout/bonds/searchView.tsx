"use client";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LTVSearch } from "@/types/search.types";
import { BondsChildProps } from "./types";
import Spinner from "@/components/common/spinner";
const SearchView: React.FC<BondsChildProps> = (props: BondsChildProps) => {
  const { quantity, pdpId, data, securityType } = props;
  const [selectedItem, setSelectedItem] = useState<LTVSearch | null>();
  const [_quantity, setQuantity] = useState<string>(quantity?.toString() ?? "");
  const [onChangeSelect, setChangeSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [selectedItem, pdpId, quantity, securityType]);

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

  const href = `/${
    selectedItem?.securityType?.toUpperCase() === "BOND" ||
    securityType?.toUpperCase() === "BOND"
      ? "bonds"
      : "equity"
  }?pdpId=${selectedItem?.pdpId || pdpId}&securityType=${
    selectedItem?.securityType || securityType
  }${quantityParam}`;

  const onSerachInput = (selectedItem) => {
    setSelectedItem(selectedItem);
    if (selectedItem !== null) {
      setChangeSelect(true);
    }
  };

  const handleUpdateClick = () => {
    const updatedQuantity = quantity?.toString();
    if (
      selectedItem !== null &&
      (selectedItem?.pdpId !== pdpId ||
        _quantity !== updatedQuantity ||
        selectedItem?.securityType !== securityType)
    ) {
      setIsLoading(true);
    }
  };

  return (
    <div className="flex gap-2 w-1/2">
      <LTVSearchInput
        className="w-full grow"
        value={data.isin}
        pdpId={pdpId}
        onSelectedItem={onSerachInput}
        quantity={_quantity}
        isUpdate={true}
        disabled={false}
      />
      <InputComponent
        value={_quantity}
        className="flex-none w-[167px]"
        placeholder="Quantity (Optional)"
        inputtype="NUMBER_WITH_COMMA"
        onChangeListener={(value) => {
          setQuantity(value);
        }}
        selectedItem={
          onChangeSelect
            ? {
                pdpId: selectedItem?.pdpId,
                securityType: selectedItem?.securityType,
              }
            : { pdpId: pdpId, securityType: securityType }
        }
        isUpdate={true}
      />
      <Link
        href={href}
        className={classValue()}
        onClick={handleUpdateClick}
        replace
      >
        {isLoading ? <Spinner fullPage={true} /> : "Update"}
      </Link>
    </div>
  );
};
export default SearchView;
