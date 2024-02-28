import BondCards from "@/components/common/Bonds/BondCards";
import { DisclaimerProps } from "./types";

const Disclaimers: React.FC<DisclaimerProps> = (props: DisclaimerProps) => {
  const { disclaimer, title } = props;
  return (
    <div className="flex flex-col items-start gap-4 flex-1">
      <BondCards className="w-full h-full" header="Disclaimer">
        <div className="inline-flex gap-8 items-start justify-center w-full flex-col">
          <div className="flex flex-col gap-2 items-start">
            <div className="nomura-18px-regular text-noumura-grey w-full">
              {disclaimer.label}
            </div>
            {
                disclaimer.value.length > 0 ?
                  disclaimer.value.filter(value => value == null || value === "" || value != "null").map((value, index) => (
                    <div key={index} className="flex-1 text-right nomura-14px-regular text-black">
                      {value}
                    </div>
                  )) : <div className="flex-1 text-right nomura-14px-regular text-black">
                    -
                  </div>
              }
          </div>
          {/* <div className="flex flex-col gap-2 items-start">
            <div className="nomura-18px-regular text-noumura-grey w-full">
              Notes
            </div>
            <div className="flex-1 text-right nomura-14px-regular text-black">
              {Itvfields.Desclaimer_and_notes.Notes}
            </div>
          </div> */}
        </div>
      </BondCards>
    </div>
  );
};

export default Disclaimers;
