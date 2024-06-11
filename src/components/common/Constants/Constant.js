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

export default columns;
