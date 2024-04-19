"use client";
import { useMemo } from "react";
import Modal from "@/components/common/modal";
import useModal from "@/hooks/useModal";

const AnnouncementModalContent = ({ payLoad }) => {
  const lastModified = payLoad.lastModifiedAt;

  return (
    <div className="flex flex-col gap-10 h-full justify-center items-center max-w-[751px]">
      <div key={payLoad.id}>{payLoad.message}</div>
      {lastModified && (
        <p className="text-right announce-modified">
          Last modified {lastModified}
        </p>
      )}
    </div>
  );
};

const Announcement = ({ data, statementClass }) => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const modalContent = useMemo(() => {
    return data ? <AnnouncementModalContent payLoad={data} /> : null;
  }, [data]);

  if (!data || data.size === 0) {
    return null;
  }

  return (
    <div>
      <div
        className={`announcement-statement cursor-pointer ${statementClass}`}
        onClick={openModal}
      >
        {data.message}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Announcement">
        {modalContent}
      </Modal>
    </div>
  );
};

export default Announcement;
