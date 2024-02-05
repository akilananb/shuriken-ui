import BondCards from "../../common/Bonds/BondCards"

const AssetsInfo = ({ Itvfields }) => {
  return (

    <BondCards className='w-[72.5625rem]' header="Other">
      <div className="w-full content-center items-start gap-4 inline-flex" >
        <div className="inline-flex content-start gap-4 flex-col flex-1">
          <div className="flex-col flex items-stretch" >
            {Itvfields.card_third.section_first.map((obj, i) =>
            (
              <div className="p-2 inline-flex justify-between items-start" >
                <div className="text-nomura-label-grey text-16px">{obj.label}</div>
                <div className="text-14px text-nomura-dark-grey font-bold">{obj.value}</div>
              </div>
            )
            )}
          </div>
        </div>
        <div className="vertical-line" />
        <div className="inline-flex content-start gap-4 flex-col flex-1">
          <div className="flex-col flex items-stretch" >
            {Itvfields.card_third.section_second.map((obj, i) =>
            (
              <div className="p-2 inline-flex justify-between items-start" >
                <div className="text-nomura-label-grey text-16px">{obj.label}</div>
                <div className="text-14px font-bold">{obj.value}</div>
              </div>
            )
            )}
          </div>
        </div>
        <div className="vertical-line" />
        <div className="inline-flex content-start gap-4 flex-col flex-1">
          <div className="flex-col flex items-stretch" >
            {Itvfields.card_third.section_third.map((obj, i) =>
            (
              <div className="p-2 inline-flex justify-between items-start" >
                <div className="text-nomura-label-grey text-text-14px">{obj.label}</div>
                <div className="text-text-14px font-bold">{obj.value}</div>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </BondCards>
  )
}

export default AssetsInfo