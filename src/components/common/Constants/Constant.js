const columns = [
  {
    name: "Security Name",
    dataField: "overrideInstrumentDetail.securityName",
    type: "text",
    width: "min-w-[10rem] max-w-[10rem]",
  },
  {
    name: "ISIN",
    dataField: "overrideInstrumentDetail.isin",
    width: "w-[7.5rem] min-w-[7.5rem]",
    type: "text",
  },
  {
    name: "Status",
    dataField: "overrideStatus",
    type: "text",
    width: "w-20",
  },
  {
    name: "Ticker",
    dataField: "overrideInstrumentDetail.ticker",
    width: "w-20",
    type: "text",
  },
  {
    name: "Exchange",
    dataField: "overrideInstrumentDetail.exchange",
    type: "text",
    width: "min-w-[10rem] max-w-[10rem]",
  },
  {
    name: "Security Type",
    dataField: "overrideInstrumentDetail.securityType",
    type: "text",
    width: "w-28",
  },
  {
    name: "LTV at IM",
    dataField: "",
    width: "w-28",
    type: "text",
  },
  {
    name: "LTV Override (%)",
    dataField: "ltvOverrideValue",
    width: "w-20",
    type: "text",
  },
  {
    name: "LTV Override Note",
    dataField: "ltvOverrideNote",
    type: "text",
    width: "min-w-[10rem]",
  },
  {
    name: "Creator",
    dataField: "createdByUser",
    width: "w-24",
    type: "text",
  },
  {
    name: "Creation Date",
    dataField: "createdAt",
    width: "w-28",
    type: "date",
  },
  {
    name: "Valid From",
    dataField: "startDate",
    width: "w-28",
    type: "date",
  },
  {
    name: "Valid To",
    dataField: "endDate",
    width: "w-28",
    type: "date",
  },
  {
    name: "Last Modified",
    dataField: "modifiedAt",
    width: "w-28",
    type: "date",
  },
];

const searchColumn = [
  {
    name: "Security Name",
    dataField: "ltvResponse.securityName",
    type: "text",
    width: "w-60",
  },
  {
    name: "ISIN",
    dataField: "ltvResponse.isin",
    type: "text",
    width: "w-40",
  },
  {
    name: "Ticker",
    dataField: "ltvResponse.ticker",
    type: "text",
    width: "w-20",
  },
  {
    name: "Exchange",
    dataField: "ltvResponse.exchange",
    type: "text",
    width: "w-40",
  },
  {
    name: "Security Type",
    dataField: "ltvResponse.securityType",
    type: "text",
    width: "w-40",
    style:
      "border-2 border-black rounded-lg p-5 flex items-center justify-center",
  },
  {
    name: "Last Close Price",
    dataField: "ltvResponse.marketData.pxLast",
    type: "text",
    width: "w-40",
  },
  {
    name: "Currency",
    dataField: "ltvResponse.marketData.crncy",
    type: "text",
    width: "w-20",
  },
  {
    name: "LTV at IM",
    dataField: "ltvResponse.ltvCalculation.ltvAtIm",
    type: "text",
    width: "w-40",
  },
  {
    name: "Quantity",
    dataField: "quantity",
    type: "text",
    width: "w-40",
  },
  {
    name: "MV (USD)",
    dataField: "ltvResponse.ltvCalculation.mv",
    type: "text",
    width: "w-20",
  },
  {
    name: "CV (USD)",
    dataField: "ltvResponse.ltvCalculation.cv",
    type: "text",
    width: "w-20",
  },
  {
    name: "Conc.",
    dataField: "",
    type: "text",
    width: "w-20",
  },
  {
    name: "LP",
    dataField: "ltvResponse.ltvCalculation.lp",
    type: "text",
    width: "w-40",
  },
  {
    name: "Disclaimer",
    dataField: "ltvResponse.ltvCalculation.disclaimer",
    type: "text",
    width: "w-40",
  },
];

export { columns, searchColumn };
