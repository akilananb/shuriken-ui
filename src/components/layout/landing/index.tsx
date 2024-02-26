import Announcement from "@/components/layout/announcement";
import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import { Input, Switch } from "antd";
import Link from "next/link";
import SearchView from "./searchView";

export async function getLadingPageData() {
  try {
    const announcementResponse = await fetch(
      `${process.env.API_BASE_URL}/shuriken/api/asset-query-svc/api/v1/announcement/fetch`,
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
  const { announcementData } = await getLadingPageData();
  return (
    <div className="flex flex-row bg-white h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10 w-[746px] relative -top-16">
        <div className="text-justify leading-normal text-2xl font-bold ">
          LTV Search
        </div>
        <Announcement
          statementClass={"min-w-[550px]"}
          data={announcementData}
        />
        <SearchView />
      </div>
    </div>
  );
}
