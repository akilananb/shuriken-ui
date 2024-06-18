import Equity from "@/components/layout/equity";

const page = async ({ searchParams }) => {
  const { pdpId, securityType, quantity = "", responseId } = searchParams;

  return (
    <>
      <Equity
        pdpId={pdpId}
        securityType={securityType}
        quantity={quantity}
        id={responseId}
      />
    </>
  );
};

export default page;
