import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Switch, Button } from "antd";
import { useState } from "react";
// import AutoCompleteSearch from '@components/common/search_input'
const renderTitle = (title) => (
  <span>
    {title}
    <a
      style={{
        float: "right",
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);
const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});
const options = [
  {
    label: renderTitle("Libraries"),
    options: [
      renderItem("AntDesign", 10000),
      renderItem("AntDesign UI", 10600),
    ],
  },
  {
    label: renderTitle("Solutions"),
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010),
    ],
  },
  {
    label: renderTitle("Articles"),
    options: [renderItem("AntDesign design language", 100000)],
  },
];

const SearchInput = () => {
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [searchvalue, setSearchvalue] = useState("");
  const styleSheet = `
    .ltv-search-popup:before {
        content: "${
          searchvalue.length != 0
            ? searchvalue + " Search Asset"
            : "Start typing to begin searching."
        }";
    }
  `;

  return (
    <div className="ltv-search-input-parent">
      {isSearchFocused && (
        <div className="absolute w-[565px] h-16 ltv-custom-search-override"></div>
      )}
      <style>{styleSheet}</style>

      <AutoComplete
        popupClassName="ltv-search-popup"
        popupMatchSelectWidth={565}
        options={options}
        className="w-[565px] !h-[50px]"
        size="large"
        bordered={!isSearchFocused}
        onChange={(e) => setSearchvalue(e)}
        onDropdownVisibleChange={() => setSearchFocused(!isSearchFocused)}
      >
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="!text-gray-800" />}
          className="px-6 py-4"
        />
      </AutoComplete>
    </div>
  );
};

function Home() {
  return (
    <div className="flex flex-row bg-white h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10 w-[746px] relative -top-16">
        <div className="text-justify leading-normal text-2xl font-bold ">
          LTV Search
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2  self-streach relative">
            <SearchInput />
            <Input
              className="w-[167px] !h-[50px]"
              type="number"
              placeholder="Quantity(Optional)"
            />
          </div>
          <div className="flex gap-2">
            <Switch size="small" />
            Multiple Security Search
          </div>
        </div>
        {/* <AutoCompleteSearch/> */}
        <div>
          <Button
            type="primary"
            className="flex text-base w-40 px-4 py-6 justify-center items-center font-bold leading-normal text-center"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
