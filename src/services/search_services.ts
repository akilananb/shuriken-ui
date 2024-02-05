import { SearchRes, LTVSearch } from "@/types/search.types";
import responseJson from "./sampleResponse.json";
class SearchService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URLL || "";
  }

  public async fetchSearch(searchKey: string): Promise<SearchRes> {
    console.log("Called fetch Search-->", searchKey);
    const response = await fetch(
      `${this.baseUrl}api/v1/asset_class_query/search/${searchKey}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  }

  public async fetchLTVCalculation(item?: LTVSearch | null): Promise<string> {
    console.log("Called fetchLTVCalculation-->", item);
    //   const response = await fetch(`${this.baseUrl}${searchKey}`, options);

    //   if (!response.ok) {
    //     throw new Error(`API request failed with status ${response.status}`);
    //   }

    //   return response.json();
    const fakeApiCall = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("dummyValue");
      }, 10000);
    });

    return await fakeApiCall;
  }
}

export * from "@/types/search.types";

export default SearchService;
