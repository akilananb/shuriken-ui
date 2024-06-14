import React from "react";
import SearchView from "../landing/searchView";

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-row bg-white h-full justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10 w-[746px] relative -top-16">
        <div className="text-justify leading-normal text-2xl font-bold ">
          LTV Search
        </div>
        <SearchView />
      </div>
    </div>
  );
};

export default IndexPage;
