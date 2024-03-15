import TooltipComponent from "@/components/common/tooltip";
import BondCards from "../../common/Bonds/BondCards";
import { LTVValueCardProps } from "./types";
import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";

const LTVValueCard: React.FC<LTVValueCardProps> = (
  props: LTVValueCardProps
) => {
  const { data, title, subTitle, className, cardValue} = props;

  return (
    <>
      <div className={`p-6 rounded-2xl border border-nomura-light-grey box-shadow-card flex flex-1 max-w-full ${className}`}>
        <div className="inline-flex justify-around w-full items-center flex-1  break-all gap-4 max-sm:flex-wrap">
          <div className="w-[25rem] flex justify-center">
            <div className="w-[175px]">
              <div className={" text-50px font-semibold"} style={{wordBreak:"break-word"}}>{title}</div>
              <div className="text-xl">{subTitle}</div>
              </div>
          </div>
          <div
            className="mr-5 h-[170px] max-sm:hidden "
            style={{
              width: 2,
              background: "#000",
            }}
          />
          <div className="inline-flex flex-col w-full">
            {data.map((item, i) => {
              const { label, value, tooltipMsg } = item;
              return (
                <div className={`flex ${i === 0 ? "items-start " : "items-center"} justify-between border-dashed border-b-2 border-noumura-grey p-1`}>
                  <div className={`nomura-16px-regular text-nomura-dark-grey w-full ${i === 0 && cardValue == '1' ? "font-bold" : ""}`}>
                    {label}
                  </div>
                  <div className="inline-flex w-full">
                  <div className={`${i === 0 && cardValue == "1" ? "text-40px" : "text-32px"} w-full text-right font-semibold`}>{value}</div>
                  {tooltipMsg && (
                    <TooltipComponent tooltipMsg={tooltipMsg}>
                      <Image
                        src={`${BASE_NAME}/static/images/Info.svg`}
                        alt="hamburger"
                        width="24"
                        height="24"
                        className="ms-1"
                      />
                    </TooltipComponent>
                 )}
                  </div>
                </div>

              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LTVValueCard;
