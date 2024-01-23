import Announcement from "@/components/layout/announcement";
import OverrideContent from "./override_content";


export async function getOverrideIntialData() {
  try {
    const [tableResponse, announcementResponse] = await Promise.all([
      fetch(`${process.env.API_BASE_URL}/instrument-override?page=0&size=100`, { cache: 'no-store' }),
      fetch(`${process.env.API_BASE_URL}/announcement/fetch`, { cache: 'no-store' }),
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

const Overrides = async () => {
  const { overrideData, announcementData } =   await getOverrideIntialData();
  return (
    <div className="flex bg-white h-full p-16 pt-8">
      <div className="flex flex-col w-full gap-4">
        <Announcement className={"w-full gap-4 flex flex-col"} modal={true} data={announcementData}/>
        <OverrideContent intialData={overrideData} />
      </div>
    </div>
  );
};



export default Overrides;
