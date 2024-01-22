"use client"
import Modal from "@/components/common/modal";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";

const initialState = {
  instrumentId: "",
  instrumentType: "BOND",
  overrideType: "OVERRIDE_LTV",
  ltvOverrideNote: '',
  ltvOverrideValue: '',
  generalNote: 'some Test',
  status: 'ACTIVE',
  startDate: '',
  endDate: '',
};

const OverridesForm = ({ formData, handleInputChange }) => (
  <>
    <div>
      <input
        type="text"
        placeholder="LTV at IM"
        className="override-input"
        value={formData.ltvOverrideValue}
        onChange={handleInputChange}
        name="ltvOverrideValue"
      />
    </div>
    <div className="overrider-dates">
      <div>
        <input
          type="date"
          placeholder="Valid From"
          className="override-input"
          value={formData.startDate}
          onChange={handleInputChange}
          name="startDate"
        />
      </div>
      <div>
        <input
          type="date"
          placeholder="Valid Till"
          className="override-input"
          value={formData.endDate}
          onChange={handleInputChange}
          name="endDate"
        />
      </div>
    </div>
    <div>
      <input
        type="text"
        placeholder="Why are you adding this override?"
        className="override-input"
        value={formData.ltvOverrideNote}
        onChange={handleInputChange}
        name="ltvOverrideNote"
      />
    </div>
  </>
);



const NotesForm = ({ formData, handleInputChange }) => (
  <>
    <div>
      <input
        type="text"
        placeholder="Add Note"
        className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
        value={formData.generalNote}
        onChange={handleInputChange}
        name="generalNote"
      />
    </div>
  </>
);


const AddOverridePopup = ({onChange}) => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [modalType, setModalType] = useState('overrides');
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!isModalOpen) {
      setFormData(initialState);
    }
  }, [isModalOpen]);

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
      onChange();
      closeModal();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div className="flex">
        <button className="asset-add-override-button me-3" onClick={() => { setModalType('overrides'); openModal(); }}>
          Add Override
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={'overrides' ? "Add Override" : "Add Note"}>
        <div className="min-w-[600px] m-20 ">
          <form onSubmit={onCreateOverride} className="w-full ">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <input
                  className="override-input"
                  type="text"
                  placeholder="Search"
                  value={formData.instrumentId}
                  onChange={handleInputChange}
                  name="instrumentId"
                />
              </div>
              {modalType === 'overrides' && <OverridesForm formData={formData} handleInputChange={handleInputChange} />}
              {modalType === 'notes' && <NotesForm formData={formData} handleInputChange={handleInputChange} />} {/* Use the NotesForm component */}
            </div>
            <div className="mt-10 w-full flex justify-center">
              <div className="flex justify-center asset-add-override-button">
                <button>Create</button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddOverridePopup;
