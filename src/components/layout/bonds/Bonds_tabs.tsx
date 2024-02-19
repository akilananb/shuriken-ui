import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";
import { TabsProps } from "./types";
import TooltipComponent from "@/components/common/tooltip";

const BondsTabs: React.FC<TabsProps> = ({ overrideData }: TabsProps) => {
  const { message, tooltipMsg } = overrideData;
  return (
    message && (
      <div className="inline-flex justify-between ">
        <div className="inline-flex gap-4">
          <button className="ltv-tabs active">Summary</button>
        </div>
        <div className="inline-flex items-center pb-3 gap-4">
          <div className="text-gray-400">{message}</div>
          <div className="info-warning">
            {tooltipMsg && (
              <TooltipComponent tooltipMsg={tooltipMsg}>
                <Image
                  src={`${BASE_NAME}/static/images/info.svg`}
                  width="16"
                  height="16"
                  alt="info"
                />
              </TooltipComponent>
            )}
            Override Active
          </div>
        </div>
      </div>
    )
  );
};

export default BondsTabs;
