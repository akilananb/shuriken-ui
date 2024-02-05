import BondCards from "../../common/Bonds/BondCards"

const Summary = ({ Itvfields }) => {
    return (
        <div className="inline-flex gap-4 items-start justify-center w-full" >
            {Itvfields.map((obj, i) => (
                <>
                    <div className="flex-1 p-2 flex-col inline-flex justify-between items-center">
                        <div className="text-nomura-label-grey text-16px w-full" >{obj.label}</div>
                        <div className="inline-flex gap-1 items-center w-full">
                            <div className="flex-1 font-bold text-right text-xl">{obj.value} </div>
                        </div>
                    </div>
                    <div className="vertical-line" style={{ width: 1, alignSelf: 'stretch', background: '#F3F3F3' }} />
                </>
            ))}
        </div>
    )
}

const Ltvvalues = ({ Itvfields }) => {
    return (
        <div className="w-[31rem] flex flex-col items-start gap-4">

            <BondCards className="w-full flex-1" header="LTV"  >
                <Summary Itvfields={Itvfields.card_second.section_first} />
            </BondCards>
            <BondCards className="w-full flex-1" header="Value">
                <Summary Itvfields={Itvfields.card_second.section_second} />
            </BondCards >
        </div >
    )
}

export default Ltvvalues