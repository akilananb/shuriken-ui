import CardHeader from "./CardHeader"

const Disclaimers = ({ Itvfields }) => {
    return (
        <div className="flex flex-col items-start gap-4 flex-1">
            <div className="summar-table w-full h-full">
                <div className="flex flex-col w-full gap-6">
                    <CardHeader header='Disclaimer and Notes' />
                    <div className="inline-flex gap-8 items-start justify-center w-full flex-col" >
                        <div className="flex flex-col gap-2 items-start">
                            <div className="summary-label w-full text-sm" >Disclaimer</div>
                            <div className="flex-1 text-right">{Itvfields.Desclaimer_and_notes.Desclaimer}</div>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <div className="summary-label w-full text-sm" >Notes</div>
                            <div className="flex-1 text-right">{Itvfields.Desclaimer_and_notes.Notes}</div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}

export default Disclaimers