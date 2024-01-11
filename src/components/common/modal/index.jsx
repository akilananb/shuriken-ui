import PropTypes from "prop-types";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center !z-20 bg-black bg-opacity-50">
      <div className="transition-all duration-300 ease-in-out lg:w-[980px] md:w-[600px] md:h-[500px] lg:h-[600px] p-5 bg-white rounded-3xl">
        <img src='/assets/Close.svg?react' className="fill-black float-right cursor-pointer" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
