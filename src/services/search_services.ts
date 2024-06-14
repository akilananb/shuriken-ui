import {
  SearchRes,
  LTVSearch,
  CalculationRes,
  AnnouncementRes,
} from "@/types/search.types";
import {
  EquityLTVCalculationRes,
  LTVCalculationRes,
} from "@/types/LTVCalculation";

class SearchService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL ?? "";
  }

  public async fetchSearch(searchKey: string): Promise<SearchRes> {
    const response = await fetch(
      `/shuriken/api/asset-query-svc/api/v1/asset_class_query/search/${searchKey}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  }

  public async fetchAnnouncement(): Promise<AnnouncementRes> {
    const response = await fetch(
      `/shuriken/api/asset-query-svc/api/v1/announcement/latest`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json();
  }

  public async fetchLTVCalculation(
    item?: LTVSearch | null
  ): Promise<CalculationRes> {
    const fakeApiCall = new Promise<CalculationRes>((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "Value retrieved successfully",
          data: {
            result: {
              ltv: 34.42,
            },
          },
        });
      }, 4000);
    });

    return await fakeApiCall;
  }

  public async fetchLTVCalculationDetail(
    pdpId: string,
    quantity: number
  ): Promise<LTVCalculationRes> {
    const response = await fetch(
      `${
        process.env.API_BASE_URL
      }/api/v1/asset_class_query/ltv/bond?pdpId=${pdpId}${
        quantity.valueOf() > 0 ? "&quantity=" + quantity : ""
      }&source=LIVE`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return response.json() as any;
    }
    return response.json();
  }
  public async EquityCalculationDetail(
    pdpId: string,
    quantity: number
  ): Promise<EquityLTVCalculationRes> {
    const response = await fetch(
      `${
        process.env.API_BASE_URL
      }/api/v1/asset_class_query/ltv/equity?pdpId=${pdpId}${
        quantity.valueOf() > 0 ? "&quantity=" + quantity : ""
      }&source=LIVE`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return response.json() as any;
    }

    return response.json();
  }
}

export * from "@/types/search.types";

export default SearchService;
