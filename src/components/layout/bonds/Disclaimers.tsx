import BondCards from "@/components/common/Bonds/BondCards"

const Disclaimers = ({ Itvfields }) => {
    return (
        <div className="flex flex-col items-start gap-4 flex-1">
            <BondCards className='w-full h-full' header="Disclaimer">
                <div className="inline-flex gap-8 items-start justify-center w-full flex-col" >
                    <div className="flex flex-col gap-2 items-start">
                        <div className="text-nomura-label-grey text-16px w-full text-sm" >Disclaimer</div>
                        <div className="flex-1 text-right">{Itvfields.Desclaimer_and_notes.Desclaimer}</div>
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <div className="text-nomura-label-grey text-16px w-full text-sm" >Notes</div>
                        <div className="flex-1 text-right">{Itvfields.Desclaimer_and_notes.Notes}</div>
                    </div>
                </div>
            </BondCards>
        </div>
    )
}

export default Disclaimers