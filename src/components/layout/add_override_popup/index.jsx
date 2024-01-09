"use client";
import Modal from "@/components/common/modal";
import { useState } from "react";


const AddOverridePopup = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button className="asset-add-override-button" onClick={openModal}>
        Add Override
      </button>
      <Modal show={showModal} onClose={closeModal}>
        <div className="flex flex-col gap-10 justify-center items-center">
          <div>
            <h1>Add Override</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Search"
                className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="LTV at IM"
                className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Valid From"
                className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Valid Till"
                className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button>Create</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddOverridePopup;
