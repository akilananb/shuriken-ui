import Announcement from "@/components/layout/announcement";
import OverrideContent from "./override_content";
import AddOverridePopup from "@/components/layout/add_override_popup";

export async function getOverrideIntialData() {
  try {
    const [tableResponse, announcementResponse] = await Promise.all([
      fetch("http://localhost:8080/api/v1/instrument-override?page=0&size=100", { cache: 'no-store' }),
      fetch("http://localhost:8080/api/v1/announcement/fetch", { cache: 'no-store' }),
    ]);

    if (!tableResponse.ok || !announcementResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const [overrideData, announcementData] = await Promise.all([
      tableResponse.json(),
      announcementResponse.json(),
    ]);

    return {
        overrideData,
        announcementData,
      };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      overrideData: {
            content: [],
            totalElements: 0,
            totalPages: 0,
        },
        announcementData: { size : 0},
    };
  }
}

const Page = async () => {
  const { overrideData, announcementData } =   await getOverrideIntialData();
  console.log("overrideData", overrideData);
  return (
    <div className="flex bg-white h-full p-16 pt-8">
      <div className="flex flex-col w-full gap-4">
        <Announcement className={"w-full gap-4 flex flex-col"} modal={true} data={announcementData}/>
        <div className="flex justify-between">
          <div className="text-justify font-sans text-xl font-bold">
            Overrides
          </div>
          <AddOverridePopup />
        </div>
       <OverrideContent intialData={overrideData} />
      </div>
    </div>
  );
};



export default Page;
