"use client";

import { formatDate } from "@/_utils/helper";
import "./infinte_table.css";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import ActionItem from "./actionItem";
const InfiniteScrollTable = ({
  columns,
  fetchData,
  disableScrollToTop,
  pageSize,
  filters,
  reload,
  initialData,
  actionItems,
  actionOnClick,
}) => {
  const { data, loading, setHasMore } = useInfiniteScroll(
    fetchData,
    pageSize,
    filters,
    reload,
    initialData
  );
  const { elementRef, showScrollTop, scrollToTop } = useScrollPosition(() => {
    if (!loading) {
      setHasMore(new Date().getTime());
    }
  });

  return (
    <>
      <div className="pb-6 border-0 border-b border-solid border-gray-200 min-w-[1000px] ">
        <table className="w-full">
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
              {actionItems?.map((actionItem, index) => (
                <th
                  key={index}
                  style={{ width: actionItem.width }}
                  className="px-4 py-4 text-left"
                ></th>
              ))}
            </tr>
          </thead>
          <tbody
            ref={elementRef}
            className="block table-fixed overflow-y-auto max-h-100  justify-between  w-full h-[50vh]"
          >
            {data.length == 0 && (
              <tr className="h-full">
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/static/images/NoResults.png"
                      alt="no data"
                      width="50"
                      height="50"
                    />
                    <p className="text-gray-600 mt-2 text-lg p-2">
                      No Data Found!
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {data.map((row, index) => (
              <tr key={index} className="px-4 pt-3">
                {columns.map((column, columnIndex) => {
                  const dataFieldParts = column.dataField.split(".");
                  let value = row;
                  // Access nested properties
                  for (const part of dataFieldParts) {
                    value = value[part];
                  }
                  return (
                    <td
                      key={columnIndex}
                      className="px-4 pt-3"
                      style={{ width: column.width }}
                    >
                      {column.type === "date"
                        ? value
                          ? formatDate(value)
                          : "-"
                        : value}
                    </td>
                  );
                })}
                {actionItems?.map((actionItem, index) => {
                  return (
                    <td
                      key={index}
                      className="px-4 pt-3"
                      style={{ width: actionItem.width }}
                    >
                      <ActionItem
                        actionType={actionItem.actionType}
                        onClick={() => {
                          actionOnClick(
                            actionItem.actionType,
                            row.instrumentOverrideId
                          );
                        }}
                      />
                    </td>
                  );
                })}
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

export default InfiniteScrollTable;
