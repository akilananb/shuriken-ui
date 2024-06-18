"use client";
import "./infinite.style.css";
import { formatDate } from "@/_utils/helper";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useScrollPosition from "@/hooks/useScrollPosition";
import Image from "next/image";
import ActionItem from "./actionItem";
import { BASE_NAME } from "@/config/appConfig";
import TooltipComponent from "../tooltip";
import { getURL } from "next/dist/shared/lib/utils";

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
  searchKey,
  multiLtvData,
  isMultiLtv,
  responseId,
}) => {
  const { data, loading, setHasMore } = useInfiniteScroll(
    fetchData,
    pageSize,
    filters,
    reload,
    initialData,
    searchKey
  );
  const { elementRef, showScrollTop, scrollToTop } = useScrollPosition(() => {
    if (!loading) {
      setHasMore(new Date().getTime());
    }
  });

  const mapData = isMultiLtv ? multiLtvData : data;

  const fetchLtv = async (id, pdpId, securityType) => {
    let basePath;
    switch (securityType?.toUpperCase()) {
      case "BOND":
        basePath = "bonds";
        break;
      case "EQUITY":
        basePath = "equity";
        break;
      default:
        basePath = "equity";
    }

    const url = `/${basePath}?responseId=${id}&pdpId=${pdpId}`;

    window.open(`${BASE_NAME}/${url}`);
  };

  return (
    <>
      <div className="overflow-y-hidden border-1 border-b border-solid">
        <table className="w-full">
          <thead className="border-b bg-nomura-dark-grey border-collapse p-4 text-white ">
            <tr>
              {columns.map((column, index) => {
                const { width, alignment = "text-left" } = column;
                return (
                  <th
                    key={index}
                    style={{ width: column.width }}
                    className={`py-3 px-4 ${width} ${alignment}`}
                  >
                    {column.name}
                  </th>
                );
              })}
              {actionItems?.map((actionItem, index) => {
                const { width, alignment = "text-left" } = actionItem;

                return (
                  <th
                    key={index}
                    style={{ width: actionItem.width }}
                    className={`${width} ${alignment} `}
                  >
                    {actionItem.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody
            ref={elementRef}
            className=" overflow-y-auto justify-between w-full h-[35vh]"
          >
            {mapData.length == 0 && (
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
            {mapData.map((row, index) => (
              <tr key={index}>
                {columns.map((column, columnIndex) => {
                  const { width, alignment = "text-left" } = column;

                  const dataFieldParts = column?.dataField?.split(".");
                  let value = row;

                  // Access nested properties
                  for (const part of dataFieldParts) {
                    value = value ? value[part] : null;
                  }
                  return (
                    <td
                      key={columnIndex}
                      className={`px-4 py-2  ${width} ${alignment}`}
                    >
                      {column.dataField === "ltvResponse.securityName" ? (
                        <a
                          onClick={() =>
                            fetchLtv(
                              responseId,
                              row.pdpId,
                              row.assetType,
                              isMultiLtv
                            )
                          }
                          rel="noopener noreferrer"
                          className="text-nomura-red underline cursor-pointer"
                        >
                          {value}
                        </a>
                      ) : column.type === "date" ? (
                        value ? (
                          formatDate(value)
                        ) : (
                          "-"
                        )
                      ) : column.dataField ===
                        "ltvResponse.ltvCalculation.disclaimer" ? (
                        <TooltipComponent tooltipMsg={value} placement="bottom">
                          [...]
                        </TooltipComponent>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
                {actionItems?.map((actionItem, index) => {
                  const { width = "", alignment = "text-left" } = actionItem;

                  return (
                    <td key={index} className={`${width} ${alignment} `}>
                      <ActionItem
                        actionType={actionItem.actionType}
                        onClick={() => {
                          actionOnClick(
                            actionItem.actionType,
                            row.instrumentOverrideId,
                            row
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
