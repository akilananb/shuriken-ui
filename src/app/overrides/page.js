import Overrides from "@/components/layout/overrides";
import { extractNomuraHeader } from "@/_utils/headerUitls";
import { redirect } from "next/navigation";
import { headers } from 'next/headers'

const Page = () => {

  const { roles } = extractNomuraHeader(headers());
  console.log(roles)
  if (!roles.includes("shuriken_admin")) {
    redirect("/");
  }

  return <Overrides />;
};

export default Page;
