"use client";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import Link from "next/link";
import { Switch } from "antd";

export default async function SearchView() {
  return (
    <div className="flex flex-col gap-8 bg-white h-full justify-center items-center">
      <div className="flex gap-2  self-streach relative">
        <LTVSearchInput
          className="w-[565px]"
          onSelectedItem={(selectedItem) => {
            console.log("SEL", selectedItem);
            // setSelectedItem(selectedItem);
          }}
        />
        <InputComponent
          className="w-[167px] "
          placeholder="Quantity (Optional)"
          inputtype="NUMBER_WITH_COMMA"
        />
      </div>
      <div className="flex gap-2 align-items-center">
        <Switch size="small" className="bg-grey" />
        Multiple Security Search
      </div>
      <div>
        <Link href="/bonds" className="asset-add-override-button">
          Search
        </Link>
      </div>
    </div>
  );
}
