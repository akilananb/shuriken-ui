"use client";
import Modal from "@/components/common/modal";
import { useState } from "react";

const AddOverridePopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [type, setTypes] = useState(0)

  const closeModal = () => {
    setShowModal(false)
  };

  const [formData, setFormData] = useState({
    instrumentTicker: '',
    overrideType: "NOTE||OVERRIDE",
    ltvOverrideNote: '',
    ltvOverrideValue: '',
    generalNote: '',
    overrideStatus: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateOverrideType = (type) => {
    // Condition for Note || Override
    return type === 1 ? 'OVERRIDE' : 'NOTE';
  };

  const onCreateOverride = async (e) => {
    e.preventDefault();
    try {
      const updatedOverrideType = updateOverrideType(type);

      // Update formData
      const data = formData;
      const updatedObject = {
        ...data,
        overrideType: updatedOverrideType
      }

      // updated formData in your fetch function
      const response = await fetch('/api/v1/instrument-override/create-override', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedObject),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div className="flex">
        <button className="asset-add-override-button me-3" onClick={() => {
          setShowModal(true)
          setTypes(1)
        }}>
          Add Override
        </button>
        <button className="asset-add-override-button" onClick={() => {
          setShowModal(true)
          setTypes(2)
        }}>
          Add Note
        </button>
      </div>
      <Modal show={showModal} onClose={closeModal} >
        <div className="flex flex-col gap-10 h-full justify-center items-center overrides-modal">
          <div>
            <h1>{type === 1 ? "Add Override" : "Add Note"}</h1>
          </div>
          <form onSubmit={onCreateOverride} className="w-full ">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  className=""
                  value={formData.instrumentTicker}
                  onChange={handleInputChange}
                  name="instrumentTicker"
                />
              </div>
              {type === 1 ? (
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
              <div>
                <input
                  type="text"
                  placeholder={type === 1 ? "Why are you adding this override?" : "Add Note"}
                  className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
                  value={type === 1 ? formData.ltvOverrideNote : formData.generalNote}
                  onChange={handleInputChange}
                  name={type === 1 ? "ltvOverrideNote" : "generalNote"}
                />
              </div>
            </div>
            <div className="mt-10 w-full flex justify-center">
              <div className="flex justify-center btn-create w-full">
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
