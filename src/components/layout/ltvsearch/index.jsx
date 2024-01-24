"use client";
import { useState } from "react";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input} from "antd";

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
      label: renderTitle("Bonds"),
      options: [
        renderItem("US Treasury 2.750% 15Nov2030 Gov", 50000),
        renderItem("Goldman Sachs 3.500% 08Jun2035 Corp", 20000),
        renderItem("IBM 4.000% 22Apr2040 Corp", 15000),
      ],
    },
    {
      label: renderTitle("Equities"),
      options: [
        renderItem("MSFT 3.100% 15Dec2045 Corp", 60100),
        renderItem("GOOGL 2.950% 20Nov2046 Corp", 30010),
      ],
    },
    {
      label: renderTitle("Funds"),
      options: [
        renderItem("AMZN 4.250% 08Aug2047 Corp", 100000),
      ],
    },
  ];

const LtvSearch = () => {
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [searchvalue, setSearchvalue] = useState("");

  return (
    <div className="ltv-search-input-parent">
      {isSearchFocused && (
        <div className="absolute w-[565px] h-16 ltv-custom-search-override"></div>
      )}
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

export default LtvSearch;
