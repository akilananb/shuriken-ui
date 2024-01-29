import Image from 'next/image';
import Button from '../button';

const SearchIput = () => {
    return (
        <>
            <div>
                <input
                    className="override-input"
                    type="text"
                    placeholder="Search"
                    name="instrumentId"
                    value="US0378331005"
                />
            </div>
            <div className="w-104">
                <input className="search-ltv" placeholder="" value="1000000" />
            </div>
        </>
    )
}

const Bond_header = ({ Itvfields }) => {
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="inline-flex items-center justify-between w-full">
                <div className="flex justify-start items-center gap-6">
                    <div className="flex gap-2 items-end justify-start">
                        <div>
                            <Button
                                type="text"
                                data-testid="shuriken-notification"
                                icon={<Image src="/static/images/ArrowBendDownLeft.svg" alt="hamburger" width="16" height="16" />}
                                className="text-base dark:invert !w-10 h-10 text-white hover:text-white"
                            />
                        </div>
                        <div className="">Back</div>
                    </div>
                    <div className="ltv-title">LTV Result</div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <SearchIput />
                        <div>
                            <button className="asset-add-override-button ">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="inline-flex items-center w-full">
                <div className="flex items-center gap-10">
                    <div className="ltv-title">{Itvfields.header_info.name}</div>
                    <div>
                        <div className="flex items-center gap-6 summer-block">
                            <div className="ltm">
                                LTV <br /> At IM
                            </div>
                            <div className="percentage inline-flex ">{Itvfields.header_info.ltv}%
                                <Image src="/static/images/info.svg" alt="hamburger" width="24" height="24" className='ms-1' />
                            </div>

                        </div>
                    </div>
                    <div className="inline-flex items-start justify-center flex-col">
                        <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
                            <div className='text-right w-[70px] text-gray-400'>ISIN</div>
                            <div>{Itvfields.header_info.isin}</div>
                        </div>
                        <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
                            <div className='text-right w-[70px] text-gray-400'>TICKER</div>
                            <div>{Itvfields.header_info.ticker}</div>
                        </div>
                    </div>
                    <div className="inline-flex items-start justify-center flex-col">
                        <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
                            <div className='text-gray-400'>Exchange</div>
                            <div>{Itvfields.header_info.exchange}</div>
                        </div>
                        <div className="inline-flex items-start pt-1 pb-1 justify-start gap-4">
                            <div className='text-gray-400'>Currency</div>
                            <div>{Itvfields.header_info.currency}</div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='inline-flex justify-between '>
                <div className='inline-flex gap-4'>
                    <button className='ltv-tabs active'>Summary</button>
                    <button className='ltv-tabs '>Charts</button>
                    <button className='ltv-tabs '>Financing Eligibility</button>
                </div>
                <div className='inline-flex items-center pb-3 gap-4'>
                    <div className='text-gray-400'>This data is correct as of NASDAQ market close on DEC-12-2023</div>
                    <div className='info-warning'>
                        <Image src="/static/images/info.svg" width='16' height='16' alt='info' />
                        Override Active
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bond_header