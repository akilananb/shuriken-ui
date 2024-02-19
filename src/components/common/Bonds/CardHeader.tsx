const CardHeader = ({ header }) => {
  return (
    <div className="flex justify-between items-center ">
      <div className="nomura-16px-bold text-black">{header}</div>
    </div>
  );
};

export default CardHeader;
