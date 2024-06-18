"use client";

import { useState, useEffect } from "react";
import "@/components/common/Bonds/bonds.css";
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
  toLTVValuesDataBond,
  toOverrideData,
  toSummaryDetailData,
  toSummaryValuesDataBond,
} from "./mapper";
import BondsTabs from "./Bonds_tabs";
import LtvMetricHeader from "./LtvMetricHeader";

const BondsPage = ({ announcementData, results, props }) => {
  const { pdpId, quantity } = props;

  const [attemptCount, setAttemptCount] = useState(0);
  const [fetchedData, setFetchedData] = useState(results);

  const errorCode = "shuriken-asset-class-query-418-data-not-ready";
  const { code } = fetchedData.errors?.[0] ?? {};

  const delay = 60000;
  const maxAttempts = 15;

  const fetchData = async () => {
    const response = await fetch(
      `/shuriken/api/asset-query-svc/api/v1/asset_class_query/ltv/bond?pdpId=${pdpId}${
        quantity.valueOf() > 0 ? "&quantity=" + quantity : ""
      }&source=LIVE`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (response.ok) {
      setFetchedData(data);
      setAttemptCount(maxAttempts + 1);
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

  useEffect(() => {
    setFetchedData(results);
  }, [results]);

  if (
    Object.keys(fetchedData).length === 0 ||
    code === errorCode ||
    (fetchedData.errors?.length ?? 0) > 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {code === errorCode ? (
          <>
            <Image
              src={`${BASE_NAME}/static/images/data-not-ready.png`}
              alt="data not ready"
              width="80"
              height="80"
            />
            <p className="text-gray-600 mt-2 text-lg p-2 text-center">
              We're currently retrieving the latest data for the asset you
              requested. This might take a few moments. <br />
              Please stay on this page, or feel free to refresh or try again
              shortly.
            </p>
          </>
        ) : (
          <>
            <Image
              src={`${BASE_NAME}/static/images/NoResults.png`}
              alt="no data"
              width="50"
              height="50"
            />
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
          data={toHeaderData(fetchedData)}
        />
        <BondsTabs overrideData={toOverrideData(fetchedData)} />
      </div>
      <div className="search-summary w-full bg-nomura-off-white">
        <div className="flex flex-wrap gap-8 w-full">
          <LtvMetricHeader
            ltvData={toLTVValuesDataBond(fetchedData)}
            metricsData={toSummaryValuesDataBond(fetchedData, quantity)}
          />
        </div>
        <div className="inline-flex gap-4 w-full flex-col">
          <DetailVerticalDisplayCard
            title="Bond Information"
            colSize={15}
            data={toSummaryDetailData(fetchedData)}
            labelClassName="nomura-14px-regular text-noumura-grey"
            valueClassName="nomura-14px-bold text-black"
          />
          <Disclaimers
            disclaimer={toDisclaimerData(fetchedData)}
            title="Disclaimer"
          />
        </div>
      </div>
    </div>
  );
};

export default BondsPage;
