import Announcement from "@/components/layout/announcement";
import LtvSearch from "@/components/layout/ltvsearch";
import { Input, Switch } from "antd";
import Link from "next/link";

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
  const { announcementData } = await getLadingPageData();
  return (
    <div className="flex flex-row bg-white h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10 w-[746px] relative -top-16">
        <div className="text-justify leading-normal text-2xl font-bold ">
          LTV Search
        </div>
        <Announcement
          className={"gap-4 flex flex-col max-w-[550px]"}
          statementClass={"min-w-[550px]"}
          modal={true}
          data={announcementData}
        />
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2  self-streach relative">
            <LtvSearch />
            <Input
              className="w-[167px] !h-[50px]"
              type="number"
              placeholder="Quantity(Optional)"
            />
          </div>
          <div className="flex gap-2 align-items-center">
            <Switch size="small" className="bg-grey" />
            Multiple Security Search
          </div>
        </div>
        <div>
          <Link href="/bonds" className="asset-add-override-button">
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
