import OverrideContent from "./override_content";

export async function getOverrideIntialData() {
  try {
    const tableResponse = fetch(
      `${process.env.API_BASE_URL}/instrument-override?page=0&size=100`,
      { cache: "no-store" }
    );

    if (!tableResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    return {
      overrideData: await tableResponse.json(),
      announcementData,
    };
  } catch (error) {
    return {
      overrideData: {
        content: [],
        totalElements: 0,
        totalPages: 0,
      },
    };
  }
}

const Overrides = async () => {
  const { overrideData } = await getOverrideIntialData();
  return (
    <div className="flex bg-white h-full p-16 pt-8">
      <div className="flex flex-col w-full gap-4">
        <OverrideContent intialData={overrideData} />
      </div>
    </div>
  );
};

export default Overrides;
