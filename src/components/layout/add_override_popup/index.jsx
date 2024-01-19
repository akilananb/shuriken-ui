"use client";
import Modal from "@/components/common/modal";
import { useState } from "react";

const AddOverridePopup = ({ fetchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [modal_type, setModalType] = useState('')


  const closeModal = () => {
    setShowModal(false)
  };

  const [formData, setFormData] = useState({
    instrumentId: "",
    instrumentType: "BOND",
    overrideType: "OVERRIDE_LTV",
    ltvOverrideNote: '',
    ltvOverrideValue: '',
    generalNote: 'some Test',
    status: 'ACTIVE',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const onCreateOverride = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/instrument-override/create-override', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await fetchData();
      setFormData({
        instrumentId: "",
        instrumentType: "BOND",
        overrideType: "OVERRIDE_LTV",
        ltvOverrideNote: '',
        ltvOverrideValue: '',
        generalNote: 'some Test',
        status: 'ACTIVE',
        startDate: '',
        endDate: '',
      });
      setShowModal(false)


    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const openModal = (modalName) => {
    setShowModal(true)
    setModalType(modalName)
  }

  return (
    <>
      <div className="flex">
        <button className="asset-add-override-button me-3" onClick={() => openModal('overrides')}>
          Add Override
        </button>
        {/* <button className="asset-add-override-button" onClick={() => openModal('notes')}>
          Add Note
        </button> */}
      </div>
      <Modal show={showModal} onClose={closeModal} >
        <div className="flex flex-col gap-10 h-full justify-center items-center overrides-modal">
          <div>
            <h1>{modal_type === 'overrides' ? "Add Override" : "Add Note"}</h1>
          </div>
          <form onSubmit={onCreateOverride} className="w-full ">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  className=""
                  value={formData.instrumentId}
                  onChange={handleInputChange}
                  name="instrumentId"
                />
              </div>
              {modal_type === 'overrides' ? (
                <div>
                  <input
                    type="text"
                    placeholder="LTV at IM"
                    className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
                    value={formData.ltvOverrideValue}
                    onChange={handleInputChange}
                    name="ltvOverrideValue"
                  />
                </div>
              ) : null}
              <div className="overrider-dates">
                <div className="">
                  <input
                    type="date"
                    placeholder="Valid From"
                    className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded date-input"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    name="startDate"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    placeholder="Valid Till"
                    className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    name="endDate"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={modal_type === 'overrides' ? "Why are you adding this override?" : "Add Note"}
                  className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
                  value={modal_type === 'overrides' ? formData.ltvOverrideNote : formData.generalNote}
                  onChange={handleInputChange}
                  name={modal_type === 'overrides' ? "ltvOverrideNote" : "generalNote"}
                />
              </div>
            </div>
            <div className="mt-10 w-full flex justify-center">
              <div className="flex justify-center asset-add-override-button">
                <button>Create</button>
              </div>
            </div>
          </form>
        </div>
      </Modal >
    </>
  );
};

export default AddOverridePopup;
