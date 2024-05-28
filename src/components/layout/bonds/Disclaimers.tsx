import BondCards from "@/components/common/Bonds/BondCards";
import { DisclaimerProps } from "./types";
const renderTextWithLineBreaks = (text: string): JSX.Element[] => {
  return text?.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br /> {/* Render line break */}
    </span>
  ));
};

const Disclaimers: React.FC<DisclaimerProps> = (props: DisclaimerProps) => {
  const { disclaimer } = props;
  return (
    <div className="flex flex-col items-start gap-4 flex-1 mb-4">
      <BondCards className="w-full h-full" header="Disclaimer and Notes">
        <div className="inline-flex gap-8 items-start justify-center w-full flex-col">
            {disclaimer.value.length > 0 ? (
          <div className="flex flex-col gap-2 items-start">
            <div className="nomura-18px-regular text-noumura-grey w-full">
              {disclaimer.label}
            </div>
              {disclaimer.value
                .filter(
                  (value) => value == null || value === "" || value != "null"
                )
                .map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 nomura-14px-regular text-black"
                  >
                    {renderTextWithLineBreaks(value)}
                  </div>
                ))
              }
          </div>
            ) : null}
          <div className="flex flex-col gap-2 items-start">
            {disclaimer.notes.length > 0 ? (
              <>
            <div className="nomura-18px-regular text-noumura-grey w-full">
              Notes
            </div>
            <div className="flex-1 nomura-14px-regular text-black">
              {disclaimer.notes
                .filter(
                  (value) => value == null || value === "" || value != "null"
                )
                .map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 nomura-14px-regular text-black"
                  >
                    {renderTextWithLineBreaks(value)}
                  </div>
                ))
              }
            </div>
            </>
            ) : null}
          </div>
        </div>
      </BondCards>
    </div>
  );
};

export default Disclaimers;
