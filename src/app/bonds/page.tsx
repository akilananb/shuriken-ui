import Bonds from "@/components/layout/bonds";

const page = async ({ searchParams }) => {
  const { isin, securityType, quantity = "" } = searchParams;

  return (
    <>
      <Bonds isin={isin} securityType={securityType} quantity={quantity} />
    </>
  );
};

export default page;
