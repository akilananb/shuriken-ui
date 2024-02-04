import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";
function BrandLogoFull() {
  return (
    <Image
      src={`${BASE_NAME}/static/images/logo.png`}
      width="88"
      height="16"
      alt="Logo"
    />
  );
}

export default BrandLogoFull;
