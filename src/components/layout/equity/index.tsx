// "use client";
import SearchService from "@/services/search_services";
import { BondsProps } from "../bonds/types";
import EquityPage from "./EquityPage";
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

const Equity: React.FC<BondsProps> = async (props: BondsProps) => {
  const { pdpId, quantity } = props;

  const searchService = new SearchService();

  const { announcementData } = await getLadingPageData();

  const _results = await searchService.EquityCalculationDetail(
    pdpId ?? "",
    quantity ?? 0
  );

  return (
    <EquityPage
      announcementData={announcementData}
      results={_results}
      props={props}
    />
  );
};

export default Equity;
