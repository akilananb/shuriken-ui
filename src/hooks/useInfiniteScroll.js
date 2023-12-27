import { useState, useEffect } from "react";

const useInfiniteScroll = (fetchData) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadMore = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      const newData = await fetchData(page);
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(false);
      setLoading(false);
    };

    loadMore();
  }, [data, page, loading, hasMore, fetchData]);

  return { data, loading, setHasMore };
};

export default useInfiniteScroll;
