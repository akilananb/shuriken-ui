import Image from "next/image"
import Button from "../button"

const CardHeader = ({ header }) => {
    return (
        <div className="flex justify-between items-center ">
            <div className="card-title">{header}</div>
            <div className="inline-flex gap-2">
                <Button
                    type="text"
                    data-testid="shuriken-notification"
                    icon={<Image src="/static/images/Control.svg" alt="hamburger" width="24" height="24" />}
                    className="text-base dark:invert !w-6 h-6 text-white hover:text-white"
                />
                <Button
                    type="text"
                    data-testid="shuriken-notification"
                    icon={<Image src="/static/images/Control-reverse.svg" alt="hamburger" width="24" height="24" />}
                    className="text-base dark:invert !w-6 h-6 text-white hover:text-white"
                />
                <Button
                    type="text"
                    data-testid="shuriken-notification"
                    icon={
                        <div className="inline-flex gap-0.5">
                            <Image src="/static/images/Ellipse.svg" alt="hamburger" width="4" height="4" />
                            <Image src="/static/images/Ellipse.svg" alt="hamburger" width="4" height="4" />
                            <Image src="/static/images/Ellipse.svg" alt="hamburger" width="4" height="4" />
                        </div>
                    }
                    className="text-base dark:invert !w-6 h-6 text-white hover:text-white"
                />
            </div>
        </div>
    )
}

export default CardHeader