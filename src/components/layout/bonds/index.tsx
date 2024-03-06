// "use client";
import "@/components/common/Bonds/bonds.css";
import Ltvvalues from "@/components/layout/bonds/Itvvalues";
import Disclaimers from "@/components/layout/bonds/Disclaimers";
import Image from "next/image";
import Bond_header from "./Bond_header";
import Itvfields from "@/components/common/Constants/ltvfields.json";
import { BondsProps } from "./types";
import SearchService from "@/services/search_services";
import DetailVerticalDisplayCard from "./DetailVerticalDisplayCard";
import { BASE_NAME } from "@/config/appConfig";

import {
  toDisclaimerData,
  toHeaderData,
  toLTVValuesData,
  toOtherInfoData,
  toOverrideData,
  toSummaryDetailData,
  toSummaryValuesData,
} from "./mapper";
import BondsTabs from "./Bonds_tabs";

const Bonds: React.FC<BondsProps> = async (props: BondsProps) => {
  const { isin, quantity } = props;

  const searchService = new SearchService();

  const _results = await searchService.fetchLTVCalculationDetail(
    isin ?? "",
    quantity ?? 0
  );

  if (Object.keys(_results).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Image
          src={`${BASE_NAME}/static/images/NoResults.png`}
          alt="no data"
          width="50"
          height="50"
        />
        <p className="text-gray-600 mt-2 text-lg p-2">
          No Results Found!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white h-full p-16 pt-8 pb-0">
        <Bond_header
          Itvfields={Itvfields}
          {...props}
          data={toHeaderData(_results)}
        />
        <BondsTabs overrideData={toOverrideData(_results)} />
      </div>
      <div className="search-summary w-full">
        <div className="inline-flex gap-4 w-full">
          <DetailVerticalDisplayCard
            title="Summary"
            colSize={6}
            data={toSummaryDetailData(_results)}
            labelClassName="nomura-18px-regular text-noumura-grey"
            valueClassName="nomura-18px-bold text-black"
          />
          <div className="w-[31rem] flex flex-col items-start gap-4">
            <Ltvvalues data={toLTVValuesData(_results)} title="LTV" />
            <Ltvvalues data={toSummaryValuesData(_results, quantity)} title="Value" />
          </div>
        </div>
        <div className="inline-flex gap-4 w-full">
          <DetailVerticalDisplayCard
            title="Other"
            colSize={8}
            data={toOtherInfoData(_results)}
            labelClassName="nomura-14px-regular text-noumura-grey"
            valueClassName="nomura-14px-bold text-black"
          />
          <Disclaimers
            disclaimer={toDisclaimerData(_results)}
            title="Disclaimer"
          />
        </div>
      </div>
    </div>
  );
};

export default Bonds;