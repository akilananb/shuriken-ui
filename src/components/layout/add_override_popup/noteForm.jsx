import { Field } from "formik";
import ErrorField from "@/components/common/ErrorField";

const NoteForm = ({ errors, touched }) => (
  <>
    <div>
      <ErrorField
        errorMsg={
          errors.instrumentId && touched.instrumentId && errors["instrumentId"]
        }
      >
        <Field
          className="override-input"
          type="text"
          placeholder="Search"
          name="instrumentId"
        />
      </ErrorField>
    </div>
    <div>
      <ErrorField
        errorMsg={
          errors.generalNote && touched.generalNote && errors["generalNote"]
        }
      >
        <input
          type="text"
          placeholder="Add Note"
          className="h-12 w-104 px-6 py-4 bg-white text-black border-1 border-solid border-nomura-off-grey rounded"
          name="generalNote"
        />
      </ErrorField>
    </div>
  </>
);

export default NoteForm;
