import Bonds from "@/components/layout/bonds";

const page = async ({ searchParams }) => {
  const { pdpId, securityType, quantity = "" } = searchParams;

  return (
    <>
      <Bonds pdpId={pdpId} securityType={securityType} quantity={quantity} />
    </>
  );
};

export default page;
