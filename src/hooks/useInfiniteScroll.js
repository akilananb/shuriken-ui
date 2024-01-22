import { useState, useEffect } from "react";

const useInfiniteScroll = (fetchPageData, pageSize, filters, initialData = {}) => {
  const [data, setData] = useState(initialData?.content || []);
  const [totalElements, setTotalElements] = useState(initialData?.totalElements || 0);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages || 0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(page < (initialData?.totalPages || 1));
  console.log('useInfiniteScroll', data, initialData);
  // Function to fetch data
  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const newData = await fetchPageData(page, pageSize, filters);
      
      if (newData && Array.isArray(newData.content)) {
        setData(prevData => [...prevData, ...newData.content]);
        setTotalElements(newData.totalElements);
        setTotalPages(newData.totalPages);
        setHasMore(page < newData.totalPages);
      } else {
        console.error('Invalid data structure received:', newData);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load more data when page number changes
  useEffect(() => {
    fetchData();
  }, [page, loading, hasMore, fetchPageData, pageSize, filters]);

  // Effect to reset and reload data when filters change
  useEffect(() => {
    setData(initialData?.content || []);
    setTotalElements(initialData?.totalElements || 0);
    setTotalPages(initialData?.totalPages || 0);
    setPage(1);
    setHasMore(1 < (initialData?.totalPages || 1));
    setLoading(false);
  }, [filters]);

  // Function to manually trigger a new page load
  const loadNextPage = () => {
    if (!loading && hasMore) setPage(prevPage => prevPage + 1);
  };

  return { data, totalElements, totalPages, loading, hasMore, loadNextPage };
};

export default useInfiniteScroll;
