// "use client";
import SearchService from "@/services/search_services";
import EquityPage from "./EquityPage";
import { SeciritySearchProps } from "@/types/LTVCalculation";
export async function getLadingPageData() {
  try {
    const announcementResponse = await fetch(
      `${process.env.API_BASE_URL}/shuriken/api/asset-query-svc/api/v1/announcement/latest`,
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

const Equity: React.FC<SeciritySearchProps> = async (
  props: SeciritySearchProps
) => {
  const { pdpId, quantity, id } = props;

  const searchService = new SearchService();

  const { announcementData } = await getLadingPageData();

  const _results = id
    ? await searchService.fetchLtv(id, pdpId ?? "")
    : await searchService.fetchLTVCalculationDetail(pdpId ?? "", quantity ?? 0);

  return (
    <EquityPage
      announcementData={announcementData}
      results={_results}
      props={props}
    />
  );
};

export default Equity;
