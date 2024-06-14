import MultiSearchView from "@/components/layout/multi_search_view";

const page = async ({ searchParams }) => {
  const { responseId } = searchParams;
  return <MultiSearchView responseId={responseId} />;
};

export default page;
