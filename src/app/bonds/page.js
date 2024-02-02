import Itvfields from "@/components/common/Constants/ltvfields.json"
import Bonds from "@/components/layout/Bonds/index"


export async function getLtVSearchData() {
  try {
    const ltvSearchData = await Promise.all([
      fetch(`${process.env.API_BASE_URL}/ltvSerachData`, { cache: 'no-store' }),
    ]);

    if (!ltvSearchData.ok) {
      throw new Error("Failed to fetch data");
    }

    const ltvData = await Promise.all([
      ltvSearchData.json(),
    ]);

    return {
      ltvData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const page = async () => {
  return (
    <div>
      <Bonds Itvfields={Itvfields}/>
    </div>
  );
};

export default page;
