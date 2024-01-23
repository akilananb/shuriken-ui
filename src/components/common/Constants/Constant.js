const columns = [
  {
    name: "Security Name",
    dataField: "overrideInstrumentDetail.securityName",
    type: "text",
  },
  {
    name: "Status",
    dataField: "overrideInstrumentDetail.status",
    type: "text",
  },
  // {
  //   name: "ISIN",
  //   dataField: "url",
  // },
  {
    name: "TICKER",
    dataField: "overrideInstrumentDetail.ticker",
    type: "text",
  },
  {
    name: "Exchange",
    dataField: "overrideInstrumentDetail.exchange",
    type: "text",
  },
  {
    name: "Security Type",
    dataField: "overrideInstrumentDetail.securityType",
    type: "text",
  },
  {
    name: "LTV at IM",
    dataField: "ltvOverrideValue",
    type: "text",
  },
  {
    name: "Override",
    dataField: "ltvOverrideNote",
    type: "text",
  },
  {
    name: "Creator",
    dataField: "overrideInstrumentDetail.createdByUser",
    type: "text",
  },
  {
    name: "Creation Date",
    dataField: "overrideInstrumentDetail.createdAt",
    type: "date",
  },
  {
    name: "Valid From",
    dataField: "startDate",
    type: "date",
  },
  {
    name: "Valid To",
    dataField: "endDate",
    type: "date",
  },
  {
    name: "Last Modified",
    dataField: "modifiedAt",
    type: "date",
  }
];

export default columns;
