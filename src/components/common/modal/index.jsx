import Image from 'next/image'
import Button from '../button';

function Modal({ isOpen, onClose, title, children }) {
  return (
    <>
      {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="fixed inset-0 bg-black opacity-50"></div> {/* Faded background */}
  <div className="bg-white rounded-lg shadow-lg p-10 relative z-10">
  <Button
  icon={ <Image src='/static/images/Close.svg'  alt="close" width="20" height="20" onClick={onClose} />}
  className={ "fill-black float-right"}
  />
   
    <div className="">
      {title && <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>}
      {children}
    </div>
  </div>
</div>
      )}
    </>
  );
}

// const Modal = ({ show, onClose, children }) => {
//   if (!show) {
//     return null;
//   }

//   return (
    
//     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center !z-20 bg-black bg-opacity-50">
//       <div className="transition-all duration-300 ease-in-out lg:w-[980px] md:w-[600px] md:h-[500px] lg:h-[600px] p-5 bg-white rounded-3xl">
//         <Image src='/static/images/Close.svg'  alt="close" width="20" height="20" className="fill-black float-right cursor-pointer" onClick={onClose} />
//         {children}
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

export default Modal;
