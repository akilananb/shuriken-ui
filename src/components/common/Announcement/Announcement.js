"use client";
import { useEffect, useState } from "react";

const Announcement = ({ className, modal }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const onOpenModal = () => {
    if (modal == true) {
      setShowModal(true);
    }
  };

  const [announcement_text, setAnnouncement] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://65a77ad194c2c5762da6c167.mockapi.io/announcement",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.json();
      setAnnouncement(result);
    };

    fetchData();
  }, []);

  const Announcement = () => {
    if (announcement_text?.length != 0) {
      return (
        <div
          className={`announcement-statement cursor-pointer ${className}`}
          onClick={onOpenModal}
        >
          {announcement_text[0]?.note}
        </div>
      );
    }
  };

  return (
    <>
      <Announcement />
      <Modal show={showModal} onClose={closeModal}>
        <div className="flex flex-col gap-10 h-full justify-center items-center">
          <div>
            <h1>Announcement</h1>
          </div>
          <div className="flex flex-col gap-4 w-full ">
            {announcement_text[0]?.all_notes?.map((items, i) => (
              <div key={i}>{items.notes}</div>
            ))}
            <p className="text-right announce-modified" >Last modified 10:42 Nov-24-23</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center !z-20 bg-black bg-opacity-50">
      <div className="transition-all duration-300 ease-in-out   bg-white rounded-3xl annouce-modal">
        <img
          src="/assets/Close.svg?react"
          className="fill-black float-right cursor-pointer"
          onClick={onClose}
        />

        {children}
      </div>
    </div>
  );
};

export default Announcement;
