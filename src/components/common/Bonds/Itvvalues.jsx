import CardHeader from "./CardHeader"

const Ltvvalues = ({ Itvfields }) => {
    return (
        <div className="w-[31rem] flex flex-col items-start gap-4">
            <div className="summar-table w-full">
                <div className="flex flex-col w-full gap-6">
                    <CardHeader header='Summary' />
                    <div className="inline-flex gap-4 items-start justify-center w-full" >
                        <div className="flex-1 p-2 flex-col inline-flex justify-between items-center">
                            <div className="summary-label w-full" >At IM</div>
                            <div className="inline-flex gap-1 items-center w-full">
                                <div className="flex-1 font-bold text-right text-xl">{Itvfields.card_second.section_first.IM} %</div>
                            </div>
                        </div>
                        <div className="vertical-line" style={{ width: 1, alignSelf: 'stretch', background: '#F3F3F3' }} />
                        <div className="flex-1 p-2 flex-col inline-flex justify-between items-center">
                            <div className="summary-label w-full" >At MC</div>
                            <div className="flex-1 font-bold text-right text-xl">{Itvfields.card_second.section_first.MC} %</div>

                        </div>
                        <div className="vertical-line" style={{ width: 1, alignSelf: 'stretch', background: '#F3F3F3' }} />
                        <div className="flex-1 p-2 flex-col inline-flex justify-between items-center">
                            <div className="summary-label w-full" >At SL</div>
                            <div className="flex-1 font-bold text-right text-xl">{Itvfields.card_second.section_first.SL} %</div>

                        </div>
                    </div>
                </div >

            </div >
            <div className="summar-table w-full ">
                <div className="flex flex-col w-full gap-6">
                    <CardHeader header='Summary' />
                    <div className="inline-flex gap-4 items-start justify-center w-full" >
                        <div className="flex-1 p-2 flex-col inline-flex justify-between items-center">
                            <div className="summary-label w-full" >Quantity</div>
                            <div className="inline-flex gap-1 items-center w-full">
                                <div className="flex-1 font-bold text-right text-xl">{Itvfields.card_second.section_second.Quantity}</div>
                            </div>
                        </div>
                        <div className="vertical-line" style={{ width: 1, alignSelf: 'stretch', background: '#F3F3F3' }} />
                        <div className="flex-1 p-2 flex-col inline-flex justify-between items-center">
                            <div className="summary-label w-full" >MV</div>
                            <div className="flex-1 font-bold text-right text-xl">{Itvfields.card_second.section_second.MV}</div>

                        </div>
                        <div className="vertical-line" style={{ width: 1, alignSelf: 'stretch', background: '#F3F3F3' }} />
                        <div className="flex-1 p-2 flex-col inline-flex justify-between items-center">
                            <div className="summary-label w-full" >CV</div>
                            <div className="flex-1 font-bold text-right text-xl">{Itvfields.card_second.section_second.CV}</div>

                        </div>
                    </div>
                </div >

            </div >
        </div>
    )
}

export default Ltvvalues