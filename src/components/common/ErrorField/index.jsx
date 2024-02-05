const ErrorField = ({children,errorMsg}) => {
  return (
    <>
      <div className="w-full flex flex-col h-16">
       {children}
       <span className="text-red-600 ">{errorMsg}</span>
      </div>
    </>
  );
};

export default ErrorField;
