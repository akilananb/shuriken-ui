import BondCards from "../../common/Bonds/BondCards"

const BondSummer = ({ Itvfields }) => {
    return (
        <BondCards className="w-full flex-1" header="Summary">
            <div className="w-full content-center items-start gap-4 inline-flex" >
                <div className="inline-flex content-start gap-4 flex-col flex-1">
                    <div className="flex-col flex items-stretch" >
                        {Itvfields.card_one.section_first.map((obj, i) =>
                        (
                            <div className="p-2 inline-flex justify-between items-start" key={i} >
                                <div className="text-nomura-label-grey text-18px">{obj.label}</div>
                                <div className="text-18px font-bold">{obj.value}</div>
                            </div>
                        )
                        )}
                    </div>
                </div>
                <div className="vertical-line" />
                <div className="inline-flex content-start gap-4 flex-col flex-1">
                    <div className="flex-col flex items-stretch" >
                        {Itvfields.card_one.section_second.map((obj, i) => (
                            <div className="p-2 inline-flex justify-between items-start" key={i + 1} >
                                <div className="text-nomura-label-grey text-18px">{obj.label}</div>
                                <div className="text-18px font-bold">{obj.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="vertical-line" />
                <div className="inline-flex content-start gap-4 flex-col flex-1">
                    <div className="flex-col flex items-stretch" >
                        {Itvfields.card_one.third_second.map((obj, i) => (
                            <div className="p-2 inline-flex justify-between items-start" key={i + 1} >
                                <div className="text-nomura-label-grey text-18px">{obj.label}</div>
                                <div className="text-18px font-bold">{obj.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BondCards>
    )
}

export default BondSummer