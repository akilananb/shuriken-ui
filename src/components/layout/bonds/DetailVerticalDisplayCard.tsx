import { chunkArray } from "@/_utils/arrayUtils";
import BondCards from "../../common/Bonds/BondCards";
import { DetailVerticalDisplayCardProps } from "./types";

const DetailVerticalDisplayCard: React.FC<DetailVerticalDisplayCardProps> = (
  props: DetailVerticalDisplayCardProps
) => {
  const { data, colSize, title, labelClassName, valueClassName } = props;

  const dataChunks = chunkArray(data, colSize);

  return (
    <BondCards className="w-full flex-1" header={title}>
      <div className="w-full content-center items-start gap-4 inline-flex ">
        {dataChunks.map((chunk, columnIndex) => (
          <div className="inline-flex content-start gap-4 flex-col flex-1">
            <div className="flex-col flex items-stretch">
              {chunk.map((item, rowIndex) => {
                const _valueClass = `${valueClassName} ${
                  item.color == "RED" ? "text-nomura-red" : ""
                }`;
                return (
                  <div
                    className="p-2 inline-flex justify-between items-start"
                    key={`${columnIndex}-${rowIndex}`}
                  >
                    <div className={labelClassName}>{item.label}</div>
                    <div className={`${_valueClass}`}>{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </BondCards>
  );
};

export default DetailVerticalDisplayCard;
