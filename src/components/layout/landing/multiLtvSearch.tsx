import React, { useEffect, useState } from "react";
import SingleLtvSearch from "./singleLtvSearch";
import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";
import { MultiLtvSearchProps, SearchValue } from "./types";
import Button from "@/components/common/button";

const multiLtvSearch: React.FC<MultiLtvSearchProps> = (
  props: MultiLtvSearchProps
) => {
  const { onChangeListener } = props;

  const [inputs, setInputs] = useState<SearchValue[] | []>([{}]);
  useEffect(() => {
    onChangeListener?.(inputs);
  }, [inputs]);

  const onAddInput = () => {
    setInputs([...inputs, {}]);
  };
  const onRemoveInputs = (index) => {
    const newArray = [...inputs.slice(0, index), ...inputs.slice(index + 1)];
    setInputs(newArray);
  };
  const onSetItems = (selectedItem, i) => {
    setInputs((pre) => {
      if (pre[i]) {
        pre[i].ltvSearchValue = selectedItem;
      }
      onChangeListener?.(pre);
      return pre;
    });
  };
  const onSetQuantity = (value, i) => {
    setInputs((pre) => {
      if (pre[i]) {
        pre[i].quantity = value;
      }
      onChangeListener?.(pre);
      return pre;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 max-h-36 overflow-y-auto">
        {inputs?.map((obj, i) => {
          return (
            <div className="flex gap-2 items-center mr-2">
              <SingleLtvSearch
                onSelectedItem={(selectedItem) => {
                  onSetItems(selectedItem, i);
                }}
                onChangeListener={(value) => {
                  onSetQuantity(value, i);
                }}
                key={i}
              />
              {i != 0 ? (
                <Button
                  data-testid="shuriken-Trash"
                  icon={
                    <Image
                      src={`${BASE_NAME}/static/images/Trash.svg`}
                      alt="hamburger"
                      width="24"
                      height="24"
                    />
                  }
                  onClick={() => onRemoveInputs(i)}
                  className="text-base dark:invert !w-10 h-10 p-2 text-white bg-red-900 hover:text-white"
                  text={undefined}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <button
        className="w-full h-full pl-6 pr-6 pt-4 pb-4 gap-2 inline-flex justify-center items-center border-x border-y border-noumura-grey border-dashed rounded"
        onClick={onAddInput}
      >
        <Image
          src={`${BASE_NAME}/static/images/plus.svg`}
          alt="hamburger"
          width="16"
          height="16"
        />
        <div className="text-16px text-noumura-grey leading-none ">Add</div>
      </button>
    </>
  );
};

export default multiLtvSearch;
