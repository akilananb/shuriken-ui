import { SearchRes } from "@/types/search.types";
import responseJson from "./sampleResponse.json";
class SearchService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URLL || "";
  }

  public async fetchSearch(searchKey: string): Promise<SearchRes[]> {
    console.log("Called fetch Search-->", searchKey);
    //   const response = await fetch(`${this.baseUrl}${searchKey}`, options);

    //   if (!response.ok) {
    //     throw new Error(`API request failed with status ${response.status}`);
    //   }

    //   return response.json();
    const fakeApiCall = new Promise<SearchRes[]>((resolve) => {
      setTimeout(() => {
        resolve(responseJson);
      }, 1000);
    });

    return await fakeApiCall;
  }
}

export * from "@/types/search.types";

export default SearchService;
