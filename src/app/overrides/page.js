import Announcement from "@/components/common/Announcement/Announcement";
import columns from "@/components/common/Constants/Constant";
import InfiniteScrollTable from "@/components/common/infinte_table";
import AddOverridePopup from "@/components/layout/add_override_popup";

export async function getServerSideProps(context) {
  // Fetch data server-side
  const response = await fetch(
    `http://localhost:8080/api/v1/instrument-override?page=0&size=100`
  );
  const data = await response.json();
  // Pass data to the page via props
  return { props: { initialData: data } };
}

const offset = 100;

export const fetchData = async (page) => {
  "use server";
  const response = await fetch(
    `http://localhost:8080/api/v1/instrument-override?page=${
      page === 1 ? 0 : (page - 1) * offset
    }&size=100`
  );

  return response.json();
};

const page = () => {
  return (
    <div className="flex bg-white h-full p-16 pt-8">
      <div className="flex flex-col w-full gap-4">
        <Announcement className={"w-full gap-4 flex flex-col"} modal={true} />
        <div className="flex justify-between">
          <div className="text-justify font-sans text-xl font-bold">
            Overrides
          </div>
          <AddOverridePopup fetchData={fetchData} />
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
