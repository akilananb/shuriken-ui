import CardHeader from "./CardHeader"

const AssetsInfo = ({ Itvfields }) => {
  return (
    <div className="summar-table w-[72.5625rem]  flex">
      <div className="flex flex-col w-full gap-6">
        <CardHeader header='Summary' />
        <div className="w-full content-center items-start gap-4 inline-flex" >
          <div className="inline-flex content-start gap-4 flex-col flex-1">
            <div className="flex-col flex items-stretch" >
              {Itvfields.card_third.section_first.map((obj, i) =>
              (
                <div className="p-2 inline-flex justify-between items-start" >
                  <div className="summary-label">{obj.label}</div>
                  <div className="summary-value ">{obj.value}</div>
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
                  <div className="summary-label">{obj.label}</div>
                  <div className="summary-value ">{obj.value}</div>
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
                  <div className="summary-label">{obj.label}</div>
                  <div className="summary-value ">{obj.value}</div>
                </div>
              )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetsInfo