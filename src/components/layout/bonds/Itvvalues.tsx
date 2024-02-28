import TooltipComponent from "@/components/common/tooltip";
import BondCards from "../../common/Bonds/BondCards";
import { LTVValueCardProps } from "./types";
import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";

const LTVValueCard: React.FC<LTVValueCardProps> = (
  props: LTVValueCardProps
) => {
  const { data, title } = props;

  return (
    <BondCards className="w-full flex-1" header={title}>
      <div className="inline-flex gap-4 items-start justify-center w-full ">
        {data.map((item, i) => {
          const { label, value, tooltipMsg } = item;
          return (
            <>
              <div className="flex-1 p-2 flex-col inline-flex justify-between items-center break-all">
                <div className="nomura-16px-regular text-noumura-grey w-full">
                  {label}
                </div>
                <div className="inline-flex gap-1 items-center w-full text-black">
                  <div className="flex-1 nomura-24px-bold text-right ">
                    {value}
                  </div>
                  {tooltipMsg && (
                    <TooltipComponent tooltipMsg={tooltipMsg}>
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
              <div
                className="vertical-line"
                style={{
                  width: 1,
                  alignSelf: "stretch",
                  background: "#F3F3F3",
                }}
              />
            </>
          );
        })}
      </div>
    </BondCards>
  );
};

export default LTVValueCard;
