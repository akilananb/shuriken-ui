"use client";

import LTVSearch from "@/components/common/ltv_search_input";
export default async function Home() {
  return (
    <LTVSearch
      onSelect={(selectedItem) => {
        console.log("Selected Item" + selectedItem);
      }}
    />
  );
}
