import Image from "next/image"

const BackButton = () => {

    return (
        <button type="text" className={`focus:outline-none bg-transparent hover:bg-gray-100 flex justify-center items-center text-base dark:invert p-2 gap-2 font-bold text-nomura-dark-grey`}>
            <Image src="/static/images/ArrowBendDownLeft.svg" alt="hamburger" width="16" height="16" />
            Back
        </button>
    )
}

export default BackButton