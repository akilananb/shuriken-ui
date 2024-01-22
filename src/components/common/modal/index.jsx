import Image from 'next/image'
import Button from '../button';

function Modal({ isOpen, onClose, title, children }) {
  return (
    <>
      {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="fixed inset-0 bg-black opacity-50"></div>
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

export default Modal;
