import "@/components/common/Bonds/bonds.css";
import Ltvvalues from "@/components/layout/bonds/Itvvalues";
import AssetsInfo from "@/components/layout/bonds/Assets_info";
import Disclaimers from "@/components/layout/bonds/Disclaimers";
import BondSummer from "@/components/layout/bonds/Bond_summer";
import Bond_header from "./Bond_header";
import Itvfields from "@/components/common/Constants/ltvfields.json";

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
