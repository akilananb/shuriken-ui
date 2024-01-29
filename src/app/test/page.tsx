"use client";
import Announcement from "@/components/layout/announcement";
// import LtvSearch from "@/components/layout/ltvsearch";
import { Input, Switch } from "antd";
import Link from "next/link";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import { useState } from "react";
import { LTVSearch } from "@/types/search.types";
export async function getLadingPageData() {
  try {
    const announcementResponse = await fetch(
      `${process.env.API_BASE_URL}/announcement/fetch`,
      { cache: "no-store" }
    );

    if (!announcementResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    return {
      announcementData: await announcementResponse.json(),
    };
  } catch (error) {
    return {
      announcementData: { size: 0 },
    };
  }
}

export default async function Home() {
  // const { announcementData } = await getLadingPageData();

  const [selectedItem, setSelectedItem] = useState<
    LTVSearch | null | undefined
  >(null);

  return (
    <div className="flex flex-row bg-white h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10 w-[746px] relative -top-16">
        <div className="text-justify leading-normal text-2xl font-bold ">
          LTV Search
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2  self-streach relative">
            <LTVSearchInput
              className="w-[565px]"
              onSelectedItem={(selectedItem) => {
                console.log("SEL", selectedItem);
                setSelectedItem(selectedItem);
              }}
            />
            <InputComponent
              className="w-[167px] "
              // className="w-full"
              placeholder="Quantity (Optional)"
              inputType="NUMBER_WITH_COMMA"
            />
          </div>
          <div className="flex gap-2 align-items-center">
            <Switch size="small" className="bg-grey" />
            Multiple Security Search
          </div>
        </div>
        <div>
          <Link
            href="/bonds"
            className={`${
              selectedItem ? "primary-button" : "primary-button-disable"
            } px-10 py-4`}
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
