// "use client";
import SearchService from "@/services/search_services";
import BondsPage from "./BondsPage";
import { BondsProps } from "./types";

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

const Bonds: React.FC<BondsProps> = async (props: BondsProps) => {
  const { isin, quantity } = props;

  const searchService = new SearchService();

  const { announcementData } = await getLadingPageData();

  const _results = await searchService.fetchLTVCalculationDetail(
    isin ?? "",
    quantity ?? 0
  );

  return (
    <BondsPage
      announcementData={announcementData}
      results={_results}
      props={props}
    />
  );
};

export default Bonds;
