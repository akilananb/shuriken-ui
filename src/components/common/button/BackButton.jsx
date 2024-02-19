"use client";
import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="text"
      onClick={() => router.back()}
      className={`focus:outline-none bg-transparent hover:bg-gray-100 flex justify-center items-center text-base dark:invert p-2 gap-2 font-bold text-nomura-dark-grey`}
    >
      <Image
        src={`${BASE_NAME}/static/images/ArrowBendDownLeft.svg`}
        alt="hamburger"
        width="16"
        height="16"
      />
      Back
    </button>
  );
};

export default BackButton;
