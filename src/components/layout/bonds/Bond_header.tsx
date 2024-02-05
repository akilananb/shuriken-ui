import Image from "next/image";
import BackButton from "../../common/button/BackButton";
import BondsTabs from "./Bonds_tabs";
import { BASE_NAME } from "@/config/appConfig";

const SearchIput = () => {
  return (
    <>
      <div>
        <input
          className="override-input"
          type="text"
          placeholder="Search"
          name="instrumentId"
          value="US0378331005"
        />
      </div>
      <div className="w-104">
        <input className="search-ltv" placeholder="" value="1000000" />
      </div>
    </>
  );
};

const Bond_header = ({ Itvfields }) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="inline-flex items-center justify-between w-full">
        <div className="flex justify-start items-center gap-6">
          <BackButton />
          <div className="ltv-title">{Itvfields.header_info.result}</div>
        </div>
        <div>
          <div className="flex gap-2">
            <SearchIput />
            <div>
              <button className="asset-add-override-button ">Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-flex items-center w-full">
        <div className="flex items-center gap-10">
          <div className="ltv-title">{Itvfields.header_info.name}</div>
          <div>
            <div className="flex items-center gap-6 summer-block">
              <div className="ltm">
                LTV <br /> At IM
              </div>
              <div className="percentage inline-flex ">
                {Itvfields.header_info.ltv}%
                <Image
                  src={`${BASE_NAME}/static/images/info.svg`}
                  alt="hamburger"
                  width="24"
                  height="24"
                  className="ms-1"
                />
              </div>
            </div>
          </div>
          <div className="inline-flex items-start justify-center flex-col">
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-right w-[70px] text-gray-400">ISIN</div>
              <div>{Itvfields.header_info.isin}</div>
            </div>
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-right w-[70px] text-gray-400">TICKER</div>
              <div>{Itvfields.header_info.ticker}</div>
            </div>
          </div>
          <div className="inline-flex items-start justify-center flex-col">
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-gray-400">Exchange</div>
              <div>{Itvfields.header_info.exchange}</div>
            </div>
            <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
              <div className="text-gray-400">Currency</div>
              <div>{Itvfields.header_info.currency}</div>
            </div>
          </div>
        </div>
      </div>
      <BondsTabs />
    </div>
  );
};

export default Bond_header;
