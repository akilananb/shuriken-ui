"use client";
import Modal from "@/components/common/modal";
import { useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import { Formik, Form } from "formik";
import OverrideForm from "./overrideForm";
import NoteForm from "./noteForm";
import { AddOverrideSchema } from "./validation";

const initialState = {
  instrumentId: "",
  instrumentType: "BOND",
  overrideType: "OVERRIDE_LTV",
  ltvOverrideNote: "",
  ltvOverrideValue: "",
  generalNote: "some Test",
  status: "ACTIVE",
  startDate: "",
  endDate: "",
};

const AddOverridePopup = ({ onChange, initialData, onClose }) => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [modalType, setModalType] = useState("overrides");
  const [commonError, setCommonError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateState = {
    instrumentId: initialData?.instrumentId,
    instrumentType: initialData?.instrumentType,
    overrideType: initialData?.overrideType,
    ltvOverrideNote: initialData?.ltvOverrideNote,
    ltvOverrideValue: initialData?.ltvOverrideValue,
    generalNote: initialData?.generalNote,
    status: initialData?.overrideStatus,
    startDate: formatDate(initialData?.startDate),
    endDate: formatDate(initialData?.endDate),
  };

  function formatDate(timestamp) {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (initialData) {
      openModal();
    }
  }, [initialData, openModal]);

  useEffect(() => {
    setCommonError(null);
  }, [isModalOpen]);
  function validateBE({ errors }) {
    const { defaultMessage } = errors[0];

    setCommonError(defaultMessage);
  }

  const onCreateOverride = async (values) => {
    setCommonError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "/shuriken/api/asset-query-svc/api/v1/instrument-override/create-override",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 400) {
        response.json().then((err) => validateBE(err));
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        onChange();
        closeModal();
      }
    } catch (error) {
      setCommonError("Oops! Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUpdateOverride = async (values, instrumentOverrideId) => {
    setCommonError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/shuriken/api/asset-query-svc/api/v1/instrument-override/update-override/${instrumentOverrideId}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 400) {
        response.json().then((err) => validateBE(err));
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        onChange();
        onClose();
        closeModal();
      }
    } catch (error) {
      setCommonError("Oops! Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInstrumentOverrideId = () => {
    return initialData?.instrumentOverrideId || "";
  };

  const handleCloseModal = () => {
    onClose();
    closeModal();
  };

  return (
    <>
      <div className="flex">
        <button
          data-testid="open-modal-button"
          className="asset-add-override-button me-3"
          onClick={() => {
            setModalType("overrides");
            openModal();
          }}
        >
          Add Override
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          isModalOpen
            ? initialData
              ? "Update Override"
              : "Add Override"
            : "Add Note"
        }
      >
        <div className="min-w-[600px] m-20 ">
          <Formik
            initialValues={initialData ? updateState : initialState}
            validationSchema={AddOverrideSchema}
            onSubmit={
              initialData
                ? (values) =>
                    onUpdateOverride(values, getInstrumentOverrideId())
                : onCreateOverride
            }
            validateOnMount
          >
            {({ errors, touched, isValid }) => {
              return (
                <Form>
                  <div className="flex flex-col gap-4 w-full">
                    {modalType === "overrides" && (
                      <OverrideForm
                        errors={errors}
                        touched={touched}
                        initialData={initialData}
                      />
                    )}
                    {modalType === "notes" && (
                      <NoteForm errors={errors} touched={touched} />
                    )}
                  </div>
                  {commonError && (
                    <span className="text-red-600">{commonError}</span>
                  )}
                  <div className="mt-10 w-full flex justify-center">
                    <button
                      aria-label="Create Button"
                      type="submit"
                      className="asset-add-override-button"
                      disabled={!isValid || isSubmitting}
                    >
                      {initialData ? "Update" : "Create"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default AddOverridePopup;
