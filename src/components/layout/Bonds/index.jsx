import "@/components/common/Bonds/bonds.css";
import Ltvvalues from "@/components/layout/Bonds/Itvvalues";
import AssetsInfo from "@/components/layout/Bonds/Assets_info";
import Disclaimers from "@/components/layout/Bonds/Disclaimers";
import BondSummer from "@/components/layout/Bonds/Bond_summer";
import Bond_header from "./Bond_header";


const page = async ({Itvfields}) => {
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
