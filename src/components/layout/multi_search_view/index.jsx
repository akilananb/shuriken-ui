import MultiSearchContent from "./multiSearchContent";

const MultiSearchView = async ({ responseId }) => {
  return (
    <div className="flex bg-white h-full p-16 pt-8">
      <div className="flex flex-col w-full gap-4">
        <MultiSearchContent id={responseId} />
      </div>
    </div>
  );
};

export default MultiSearchView;
