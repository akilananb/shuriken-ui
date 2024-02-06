import CardHeader from "./CardHeader"

const BondCards = ({ className, children, header }) => {
    return (
        <div className={`p-4 rounded-2xl border border-nomura-light-grey bg-white shadow-card-shadow flex ${className}`}>
            <div className="flex flex-col w-full gap-6">
                <CardHeader header={header} />
                {children}
            </div>
        </div>
    )
}

export default BondCards