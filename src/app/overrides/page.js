import InfiniteScrollTable from "@/components/common/infinte_table";
import AddOverridePopup from "@/components/layout/add_override_popup";

// export async function getServerSideProps(context) {
//   // Fetch data server-side
//   const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_limit=20`);
//   const data = await response.json();

//   // Pass data to the page via props
//   return { props: { initialData: data } };
// }



const offset = 20;
const columns = [
  {
    name: "Security Name",
    dataField: "id",
  },
  {
    name: "Type",
    dataField: "albumId",
  },
  {
    name: "Status",
    dataField: "title",
  },
  {
    name: "ISIN",
    dataField: "url",
  },
  {
    name: "TICKER",
    dataField: "id",
  },
  {
    name: "Exchange",
    dataField: "id",
  },
  {
    name: "Security Type",
    dataField: "id",
  },
  {
    name: "LTV at IM",
    dataField: "id",
  },
  {
    name: "Override",
    dataField: "id",
  },
  {
    name: "Creator",
    dataField: "id",
  },
  {
    name: "Creation Date",
    dataField: "id",
  },
  {
    name: "Valid From",
    dataField: "id",
  },
  {
    name: "Valid To",
    dataField: "id",
  },
  {
    name: "Last Modified",
    dataField: "id",
  },
];

export const fetchData = async (page) => {
  'use server';
const response = await fetch(
  `https://jsonplaceholder.typicode.com/photos?_start=${
    page === 1 ? 0 : (page - 1) * offset
  }&_limit=20`
);
return response.json();
};


const page = () => {


  return (
    <div className="flex bg-white h-full p-16">
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-between">
          <div className="text-justify font-sans text-xl font-bold">
            Overrides
          </div>
          <AddOverridePopup />
        </div>
        <div className="flex flex-row items-baseline override-filter">
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

export default page;
