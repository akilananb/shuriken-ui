import Ltvvalues from "@/components/layout/bonds/Itvvalues";

const LtvMetricHeader = ({ ltvData, metricsData }) => {
  return (
    <div className="flex flex-wrap gap-8 w-full">
      <Ltvvalues
        data={ltvData}
        title="LTV"
        subTitle="Loan-To-Value"
        className="bg-noumura-light-red "
        cardValue="1"
      />
      <Ltvvalues
        data={metricsData}
        title="Key Metrics"
        subTitle=""
        className="bg-nomura-secondary-grey"
        cardValue="2"
      />
    </div>
  );
};

export default LtvMetricHeader;
