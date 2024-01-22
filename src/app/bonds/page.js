const page = () => {
  return (
    <div className="flex bg-white h-full p-16 pt-8">
      <div className="flex flex-col w-full gap-4">
        <div className="inline-flex items-center justify-between w-full">
          <div className="flex justify-start items-center gap-6">
            <div className="flex gap-2 items-end justify-start">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5 6.5L2 9.5L5 12.5"
                    stroke="#323232"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 3.5C14 5.0913 13.3679 6.61742 12.2426 7.74264C11.1174 8.86786 9.5913 9.5 8 9.5H2"
                    stroke="#323232"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="">Back</div>
            </div>
            <div className="ltv-title">LTV Result</div>
          </div>
          <div>
            <div className="flex gap-2">
              <div>
                <input
                  className="search-ltv"
                  placeholder=""
                  value="US0378331005"
                />
              </div>
              <div className="w-104">
                <input className="search-ltv" placeholder="" value="1000000" />
              </div>
              <div>
                <button className="asset-add-override-button ">Update</button>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center w-full">
          <div className="flex items-center gap-10">
            <div className="ltv-title">AAPL 4.450% 06May2044 Corp</div>
            <div>
              <div className="flex items-center gap-6 summer-block">
                <div className="ltm">
                  LTV <br /> At IM
                </div>
                <div className="percentage">50%</div>
              </div>
            </div>
            <div className="inline-flex items-start justify-center flex-col">
              <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
                <div>ISIN</div>
                <div>US037833AT77</div>
              </div>
              <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
                <div>TICKER</div>
                <div>-</div>
              </div>
            </div>
            <div
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  paddingTop: 4,
                  paddingBottom: 4,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 8,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    width: 70,
                    textAlign: "right",
                    color: "#999999",
                    fontSize: 14,
                    fontFamily: "Arial",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  Exchange
                </div>
                <div
                  style={{
                    width: 99,
                    color: "#323232",
                    fontSize: 14,
                    fontFamily: "Arial",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  Open Market
                </div>
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  paddingTop: 4,
                  paddingBottom: 4,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 8,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    width: 70,
                    textAlign: "right",
                    color: "#999999",
                    fontSize: 14,
                    fontFamily: "Arial",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  Currency
                </div>
                <div
                  style={{
                    width: 99,
                    color: "#323232",
                    fontSize: 14,
                    fontFamily: "Arial",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  USD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
