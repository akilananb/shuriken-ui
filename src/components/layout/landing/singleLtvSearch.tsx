import InputComponent from "@/components/common/input";
import LTVSearchInput from "@/components/common/ltv_search_input";
import { SingleLtvSearchProps } from "./types";

const singleLtvSearch: React.FC<SingleLtvSearchProps> = (
  props: SingleLtvSearchProps
) => {
  const { onSelectedItem, onChangeListener, pdpId, quantity, value } = props;
  return (
    <div className="flex gap-2  self-streach relative">
      <LTVSearchInput
        className="w-[565px]"
        onSelectedItem={onSelectedItem}
        pdpId={pdpId}
        value={value}
        quantity={quantity}
        isUpdate={false}
        disabled={false}
      />
      <InputComponent
        className="w-[167px]"
        placeholder="Quantity (Optional)"
        inputtype="NUMBER_WITH_COMMA"
        onChangeListener={onChangeListener}
        isUpdate={false}
      />
    </div>
  );
};

export default singleLtvSearch;
