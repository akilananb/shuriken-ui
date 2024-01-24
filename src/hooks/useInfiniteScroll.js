import { useState, useEffect } from "react";

const useInfiniteScroll = (fetchPageData, pageSize, filters, reload, initialData) => {
  const [data, setData] = useState(initialData?.content || []);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState("");
  const fetchData = async () => {
    if (loading || !hasMore || (totalPage==page)) return;

    setLoading(true);

    try {
      const newData = await fetchPageData(page, pageSize, filters);
      console.log(`Data ${page} -- ${newData.totalPages}`,)

      if (newData && Array.isArray(newData.content) && page <= newData.totalPages ) {
        setData(prevData => [...prevData, ...newData.content]);
        setPage(prevPage => prevPage + 1);
        setTotalPage((newData.totalPages +1))
        // setHasMore(page < newData.totalPages);
      } else {
        console.error('Invalid data structure received:', newData);
        // setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load more data when page number changes
  useEffect(() => {
    fetchData();
  }, [hasMore]);

  useEffect(() => {
    console.log("CALLED",hasMore)
  }, [ hasMore]);

  // Effect to reset and reload data when filters change
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(new Date().getTime());
    setLoading(false);
    fetchData();
  }, [filters,reload]);

  // Function to manually trigger a new page load
  const loadNextPage = () => {
    if (!loading && hasMore) setPage(prevPage => prevPage + 1);
  };

  return { data,  loading, setHasMore };
};

export default useInfiniteScroll;
