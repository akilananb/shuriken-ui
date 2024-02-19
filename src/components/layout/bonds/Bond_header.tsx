import Image from "next/image";
import BackButton from "../../common/button/BackButton";
import BondsTabs from "./Bonds_tabs";
import { BASE_NAME } from "@/config/appConfig";
import SearchView from "@/components/layout/bonds/searchView";
import { HeaderProps } from "./types";
import TooltipComponent from "@/components/common/tooltip";

const Bond_header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { data } = props;
  const { currency, exchange, isin, ltv, name, result, ticker, ltvTooltipMsg } =
    data;
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="inline-flex items-center justify-between w-full">
        <div className="flex justify-start items-center gap-6">
          <BackButton />
          <div className="ltv-title">{result}</div>
        </div>
        <SearchView {...props} />
      </div>

      <div className="inline-flex items-center w-full">
        <div className="flex items-center gap-10">
          <div className="ltv-title">{name}</div>
          <div>
            <div className="flex items-center gap-6 summer-block">
              <div className="ltm">
                LTV <br /> At IM
              </div>
              <div className="percentage inline-flex ">
                {ltv}%
                {ltvTooltipMsg && (
                  <TooltipComponent tooltipMsg={ltvTooltipMsg}>
                    <Image
                      src={`${BASE_NAME}/static/images/info.svg`}
                      alt="hamburger"
                      width="24"
                      height="24"
                      className="ms-1"
                    />
                  </TooltipComponent>
                )}
              </div>
            </div>
          </div>
          <div className="inline-flex items-start justify-center flex-col">
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-right w-[70px] text-gray-400">ISIN</div>
              <div>{isin}</div>
            </div>
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-right w-[70px] text-gray-400">TICKER</div>
              <div>{ticker}</div>
            </div>
          </div>
          <div className="inline-flex items-start justify-center flex-col">
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-gray-400">Exchange</div>
              <div>{exchange}</div>
            </div>
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-gray-400">Currency</div>
              <div>{currency}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bond_header;
