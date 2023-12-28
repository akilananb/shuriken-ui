import InfiniteScrollTable from "@components/common/infinte_table";
import AddOverridePopup from "@components/layout/add_override_popup";
const Overrides = () => {
  const offset = 20;
  const columns = [
    {
      name: "ID",
      dataField: "id",
    },
    {
      name: "Album ID",
      dataField: "albumId",
    },
    {
      name: "Title",
      dataField: "title",
    },
    {
      name: "URL",
      dataField: "url",
    },
    {
      name: "Thumbnail Url",
      dataField: "thumbnailUrl",
    },
  ];

  const fetchData = async (page) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${
        page === 1 ? 0 : (page - 1) * offset
      }&_limit=20`
    );
    return response.json();
  };

  return (
    <div className="flex bg-white h-full p-16">
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-between">
          <div className="text-justify font-sans text-xl font-bold">
            Overrides
          </div>
          <AddOverridePopup />
        </div>
        <div className="flex flex-row items-baseline">
          <div className="flex flex-row pr-4 items-center gap-4">
            <div className="font-bold text-base">Filters:</div>
            <div className="flex flex-row pr-4 items-center gap-4">
              <button className="asset-override-filter-button-active">
                All Securities
              </button>
              <button className="asset-override-filter-button">Equity</button>
              <button className="asset-override-filter-button">Bond</button>
              <button className="asset-override-filter-button">Funds</button>
            </div>
            <div className="w-px h-8 bg-gray-500"></div>
            <div className="flex flex-row pr-4 items-center gap-4">
              <button className="asset-override-filter-button-active">
                Active
              </button>
              <button className="asset-override-filter-button">InActive</button>
            </div>
          </div>
        </div>
        <InfiniteScrollTable fetchData={fetchData} columns={columns} />
      </div>
    </div>
  );
};

export default Overrides;
