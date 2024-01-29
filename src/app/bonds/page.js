import Bond_header from "@/components/common/Bonds/Bond_header";
import "../../components/common/Bonds/bonds.css";
import Ltvvalues from "@/components/common/Bonds/Itvvalues";
import AssetsInfo from "@/components/common/Bonds/Assets_info";
import Disclaimers from "@/components/common/Bonds/Disclaimers";
import BondSummer from "@/components/common/Bonds/Bond_summer";
import Itvfields from "@/components/common/Constants/ltvfields.json"

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
      <div className="flex bg-white h-full p-16 pt-8 pb-0">
        <Bond_header Itvfields={Itvfields} />
      </div>
      <div className="search-summary w-full">
        <div className="inline-flex gap-4 w-full">
          <BondSummer Itvfields={Itvfields} />
          <Ltvvalues Itvfields={Itvfields} />
        </div>
        <div className="inline-flex gap-4 w-full">
          <AssetsInfo Itvfields={Itvfields} />
          <Disclaimers Itvfields={Itvfields} />
        </div>
      </div>
    </div>
  );
};

export default page;
