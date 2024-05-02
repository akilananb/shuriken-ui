import Equity from "@/components/layout/equity";

const page = async ({ searchParams }) => {
  const { pdpId, securityType, quantity = "" } = searchParams;

  return (
    <>
      <Equity pdpId={pdpId} securityType={securityType} quantity={quantity} />
    </>
  );
};

export default page;