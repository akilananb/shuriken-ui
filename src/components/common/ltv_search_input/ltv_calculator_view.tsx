import { LTVCalculationViewProps } from "./types";
const LTVCalculationView: React.FC<LTVCalculationViewProps> = (
  props: LTVCalculationViewProps
) => {
  const { className, loading } = props;

  const renderContent = () => {
    switch (loading) {
      case "SUCCESS": {
        return (
          <>
            LTV @ IM: <span className="font-bold">50%</span>
          </>
        );
      }
      case "LOADING": {
        return (
          <div className="h-4 w-4 m-1 animate-spin rounded-full border-2 border-nomura-red border-r-transparent align-[-0.125em] " />
        );
      }
    }
  };
  return (
    <div
      className={`${className} ${loading === "UNKNOWN" ? "hidden" : ""} z-10`}
    >
      {/* className="w-8 h-8 text-gray-200 animate-spin fill-nomura-red" */}

      <div className="border rounded px-2 border-nomura-off-grey bg-nomura-light-grey">
        {renderContent()}
      </div>
    </div>
  );
};

export default LTVCalculationView;
