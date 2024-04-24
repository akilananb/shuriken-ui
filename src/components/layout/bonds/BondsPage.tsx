"use client";

import { useState, useEffect } from "react";
import "@/components/common/Bonds/bonds.css";
import Ltvvalues from "@/components/layout/bonds/Itvvalues";
import Disclaimers from "@/components/layout/bonds/Disclaimers";
import Image from "next/image";
import Bond_header from "./Bond_header";
import Itvfields from "@/components/common/Constants/ltvfields.json";
import DetailVerticalDisplayCard from "./DetailVerticalDisplayCard";
import { BASE_NAME } from "@/config/appConfig";
import Announcement from "@/components/layout/announcement";
import {
  toDisclaimerData,
  toHeaderData,
  toLTVValuesData,
  toOverrideData,
  toSummaryDetailData,
  toSummaryValuesData,
} from "./mapper";
import BondsTabs from "./Bonds_tabs";

const BondsPage = ({ announcementData, results, props }) => {
  const { isin, quantity } = props;

  const [attemptCount, setAttemptCount] = useState(0);
  const [fetchedData, setFetchedData] = useState();

  const errorCode = "shuriken-asset-class-query-404-data-not-ready";
  const { code } = results.errors?.[0] ?? {};

  const delay = 60000;
  const maxAttempts = 15;

  const fetchData = async () => {
    const response = await fetch(
      `/shuriken/api/asset-query-svc/api/v1/asset_class_query/ltv/bond?isin=${isin}${
        quantity.valueOf() > 0 ? "&quantity=" + quantity : ""
      }&source=LIVE`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (response.ok) {
      setFetchedData(data);
    }
  };

  useEffect(() => {
    if (code === errorCode && attemptCount < maxAttempts) {
      const intervalId = setInterval(() => {
        if (attemptCount < maxAttempts) {
          fetchData();
          setAttemptCount((prevCount) => prevCount + 1);
        }
      }, delay);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [attemptCount, maxAttempts]);

  if (
    Object.keys(results).length === 0 ||
    code === errorCode ||
    (results.errors?.length ?? 0) > 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Image
          src={`${BASE_NAME}/static/images/NoResults.png`}
          alt="no data"
          width="50"
          height="50"
        />
        {code === errorCode ? (
          <>
            <p className="text-gray-600 mt-2 text-lg p-2">
              We are currently processing your LTV request. Please try again
              later.
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mt-2 text-lg p-2">No Results Found!</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white h-full p-16 pt-8 pb-4">
        <Announcement
          statementClass={"min-w-[550px] !mb-4"}
          data={announcementData}
        />
        <Bond_header
          Itvfields={Itvfields}
          {...props}
          data={fetchedData ? toHeaderData(fetchedData) : toHeaderData(results)}
        />
        <BondsTabs overrideData={toOverrideData(results)} />
      </div>
      <div className="search-summary w-full bg-nomura-off-white">
        <div className="flex flex-wrap gap-8 w-full">
          <Ltvvalues
            data={
              fetchedData
                ? toLTVValuesData(fetchedData)
                : toLTVValuesData(results)
            }
            title="LTV"
            subTitle="Loan-To-Value"
            className="bg-noumura-light-red "
            cardValue="1"
          />
          <Ltvvalues
            data={
              fetchedData
                ? toSummaryValuesData(fetchedData, quantity)
                : toSummaryValuesData(results, quantity)
            }
            title="Key Metrics"
            subTitle=""
            className="bg-nomura-secondary-grey"
            cardValue="2"
          />
        </div>
        <div className="inline-flex gap-4 w-full flex-col">
          <DetailVerticalDisplayCard
            title="Bond Information"
            colSize={15}
            data={
              fetchedData
                ? toSummaryDetailData(fetchedData)
                : toSummaryDetailData(results)
            }
            labelClassName="nomura-14px-regular text-noumura-grey"
            valueClassName="nomura-14px-bold text-black"
          />
          <Disclaimers
            disclaimer={
              fetchedData
                ? toDisclaimerData(fetchedData)
                : toDisclaimerData(results)
            }
            title="Disclaimer"
          />
        </div>
      </div>
    </div>
  );
};

export default BondsPage;
