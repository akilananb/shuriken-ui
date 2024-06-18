import Bonds from "@/components/layout/bonds";

const page = async ({ searchParams }) => {
  const { pdpId, securityType, quantity = "", responseId } = searchParams;

  return (
    <>
      <Bonds
        pdpId={pdpId}
        securityType={securityType}
        quantity={quantity}
        id={responseId}
      />
    </>
  );
};

export default page;
