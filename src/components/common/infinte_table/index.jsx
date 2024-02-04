"use client";
import "./infinite.style.css";

import { formatDate } from "@/_utils/helper";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import ActionItem from "./actionItem";
import { BASE_NAME } from "@/config/appConfig";

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
      <div className="overflow-y-hidden border-1 border-b border-solid  ">
        <table className="w-full ">
          <thead className="border-b bg-nomura-dark-grey border-collapse p-4 text-white ">
            <tr>
              {columns.map((column, index) => {
                const { width = "", alignment = "text-left" } = column;
                return (
                  <th
                    key={index}
                    style={{ width: column.width }}
                    className={`px-2 py-2 tracking-wide ${width} ${alignment} `}
                  >
                    {column.name}
                  </th>
                );
              })}
              {actionItems?.map((actionItem, index) => {
                const { width = "", alignment = "text-left" } = actionItem;

                return (
                  <th
                    key={index}
                    style={{ width: actionItem.width }}
                    className={`px-2 py-2 tracking-wide ${width} ${alignment} `}
                  ></th>
                );
              })}
            </tr>
          </thead>
          <tbody
            ref={elementRef}
            className=" overflow-y-auto justify-between  w-full  h-[35vh]"
          >
            {data.length == 0 && (
              <tr className="w-full h-full">
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <Image
                      src={`${BASE_NAME}/static/images/NoResults.png`}
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
              <tr key={index}>
                {columns.map((column, columnIndex) => {
                  const { width = "", alignment = "text-left" } = column;

                  const dataFieldParts = column.dataField.split(".");
                  let value = row;
                  // Access nested properties
                  for (const part of dataFieldParts) {
                    value = value[part];
                  }
                  return (
                    <td
                      key={columnIndex}
                      className={`px-2 py-2 ${width} ${alignment} `}
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
                  const { width = "", alignment = "text-left" } = actionItem;

                  return (
                    <td
                      key={index}
                      className={`px-2 py-2 ${width} ${alignment} `}
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
