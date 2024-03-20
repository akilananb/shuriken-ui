const Button = ({ text, icon, onClick, className }) => {
  return (
      <button
          onClick={onClick}
          className={`focus:outline-none bg-transparent flex justify-center items-center ${className}`}
      >
          {icon ? icon : text}
      </button>
  );
};

export default Button;