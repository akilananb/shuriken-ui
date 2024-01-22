"use client";
import Modal from "@/components/common/modal";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";
import { Field, Formik, Form } from "formik";
import OverridesForm from "./OverridesForm";
import NoteForm from "./NoteForm";

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

  function validateBE({ errors }) {
    const { field, defaultMessage } = errors[0];

    setCommonError(defaultMessage);
  }

  const onCreateOverride = async (values) => {
    setCommonError(null);
    try {
      const response = await fetch(
        "/api/v1/instrument-override/create-override",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.error("Error:", response.res);
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
          >
            {({ errors, touched, isValid }) => {
              return (
                <Form>
                  <div className="flex flex-col gap-4 w-full">
                    {modalType === "overrides" && (
                      <OverridesForm errors={errors} touched={touched} />
                    )}
                    {modalType === "notes" && (
                      <NotesForm errors={errors} touched={touched} />
                    )}
                  </div>
                  {commonError && (
                    <span className="text-red-600">{commonError}</span>
                  )}
                  <div className="mt-10 w-full flex justify-center">
                    <button
                      type="submit"
                      className={`flex justify-center asset-add-override-button${!isValid?"-disabled":""}`}
                      disabled={!isValid}
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
