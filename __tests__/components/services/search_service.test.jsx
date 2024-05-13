import SearchService from '../../../src/services/search_services';

describe('SearchService', () => {
  let searchService = SearchService;

  beforeEach(() => {
    searchService = new SearchService();
  });

  describe('fetchSearch', () => {
    it('should fetch search results', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ results: [] }),
      });

      const searchKey = 'example';
      const searchRes = await searchService.fetchSearch(searchKey);

      expect(fetch).toHaveBeenCalledWith(
        `/shuriken/api/asset-query-svc/api/v1/asset_class_query/search/${searchKey}`,
        { cache: 'no-store' }
      );
      expect(searchRes).toEqual({ results: [] });
    });

    it('should throw an error if the API request fails', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      const searchKey = 'example';

      await expect(searchService.fetchSearch(searchKey)).rejects.toThrow(
        'API request failed with status 500'
      );
    });
  });

  describe('fetchLTVCalculation', () => {
    it('should fetch LTV calculation', async () => {
      const ltvSearch = { /* ltv search object */ };
      const calculationRes = await searchService.fetchLTVCalculation(ltvSearch);

      expect(calculationRes).toEqual({
        status: 'success',
        message: 'Value retrieved successfully',
        data: {
          result: {
            ltv: 34.42,
          },
        },
      });
    });
  });

  describe('fetchLTVCalculationDetail', () => {
    it('should fetch LTV calculation detail', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ /* ltv calculation response */ }),
      });

      const isin = 'example';
      const quantity = 10;
      const ltvCalculationRes = await searchService.fetchLTVCalculationDetail(
        isin,
        quantity
      );

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_BASE_URL}/shuriken/api/asset-query-svc/api/v1/asset_class_query/ltv/bond?isin=${isin}&quantity=${quantity}&source=LIVE`,
        { cache: 'no-store' }
      );
      expect(ltvCalculationRes).toEqual({ /* ltv calculation response */ });
    });

    it('should return an empty object if the API request fails', async () => {
      // Mock the fetch function
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      const isin = 'example';
      const quantity = 10;
      const ltvCalculationRes = await searchService.fetchLTVCalculationDetail(
        isin,
        quantity
      );

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_BASE_URL}/shuriken/api/asset-query-svc/api/v1/asset_class_query/ltv/bond?isin=${isin}&quantity=${quantity}&source=LIVE`,
        { cache: 'no-store' }
      );
      expect(ltvCalculationRes).toEqual({});
    });
  });
});