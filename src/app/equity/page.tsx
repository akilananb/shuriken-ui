import Equity from "@/components/layout/equity";

const page = async ({ searchParams }) => {
  const { isin, securityType, quantity = "" } = searchParams;

  return (
    <>
      <Equity isin={isin} securityType={securityType} quantity={quantity} />
    </>
  );
};

export default page;