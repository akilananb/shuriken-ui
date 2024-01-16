"use client"

import "./infinte_table.css";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useScrollPosition from "@/hooks/useScrollPosition";

const InfiniteScrollTable = ({ columns, fetchData, disableScrollToTop }) => {
  const { data, loading, setHasMore } = useInfiniteScroll(fetchData);

  const { elementRef, showScrollTop, scrollToTop } = useScrollPosition(() => {
    if (!loading) {
      setHasMore(true);
    }
  });

  return (
    <>
      <div className="pb-6 border-0 border-b border-solid border-gray-200">
        <table className="w-full divide-x">
          <thead className="border-b bg-nomura-dark-grey border-collapse p-4 text-white ">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{ width: column.width }}
                  className="px-4 py-4 text-left"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            ref={elementRef}
            className="block table-fixed overflow-y-auto max-h-100 hide-scrollbar "
          >
            {data.map((row, index) => (
              <tr key={index} className="px-4 pt-3">
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} style={{ width: column.width }}>
                    {row[column.dataField]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p>Loading more items...</p>}
      {!disableScrollToTop && showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          Scroll to Top
        </button>
      )}
    </>
  );
};

InfiniteScrollTable.defaultProps = {
  offset: 20,
};


export default InfiniteScrollTable;
