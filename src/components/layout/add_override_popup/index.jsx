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

const AddOverridePopup = ({ onChange }) => {
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [modalType, setModalType] = useState("overrides");
  const [commonError, setCommonError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCommonError(null);
  }, [isModalOpen]);
  function validateBE({ errors }) {
    const { field, defaultMessage } = errors[0];

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
      console.error("Error:", error.message);
      setCommonError("Oops! Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex">
        <button
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
        onClose={closeModal}
        title={"overrides" ? "Add Override" : "Add Note"}
      >
        <div className="min-w-[600px] m-20 ">
          <Formik
            initialValues={initialState}
            validationSchema={AddOverrideSchema}
            onSubmit={onCreateOverride}
            validateOnMount
          >
            {({ errors, touched, isValid }) => {
              return (
                <Form>
                  <div className="flex flex-col gap-4 w-full">
                    {modalType === "overrides" && (
                      <OverrideForm errors={errors} touched={touched} />
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
                      type="submit"
                      className="asset-add-override-button"
                      disabled={!isValid || isSubmitting}
                    >
                      Create
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
