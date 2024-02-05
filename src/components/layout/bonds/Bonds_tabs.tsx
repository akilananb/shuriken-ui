import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";

const BondsTabs = () => {
  return (
    <div className="inline-flex justify-between ">
      <div className="inline-flex gap-4">
        <button className="ltv-tabs active">Summary</button>
      </div>
      <div className="inline-flex items-center pb-3 gap-4">
        <div className="text-gray-400">
          This data is correct as of NASDAQ market close on DEC-12-2023
        </div>
        <div className="info-warning">
          <Image
            src={`${BASE_NAME}/static/images/info.svg`}
            width="16"
            height="16"
            alt="info"
          />
          Override Active
        </div>
      </div>
    </div>
  );
};

export default BondsTabs;
