"use client";
import Announcement from "@/components/layout/announcement";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Switch, Button } from "antd";
import Link from "next/link";
import { useState } from "react";

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

export default function Home() {
  return (
    <div className="flex flex-row bg-white h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10 w-[746px] relative -top-16">
        <div className="text-justify leading-normal text-2xl font-bold ">
          LTV Search
        </div>
        <Announcement className={"w-343"}/>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2  self-streach relative">
            <SearchInput />
            <Input
              className="w-[167px] !h-[50px]"
              type="number"
              placeholder="Quantity(Optional)"
            />
          </div>
          <div className="flex gap-2 align-items-center">
            <Switch size="small" className="bg-grey" />
            Multiple Security Search
          </div>
        </div>
        <div>
          <Link
            href="/bonds"
            className="asset-add-override-button"
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
