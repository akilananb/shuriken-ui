import { Field } from "formik";
import ErrorField from "@/components/common/ErrorField";

const OverridesForm = ({ errors, touched }) => (
  <>
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
    <ErrorField
      errorMsg={
        errors.ltvOverrideValue &&
        touched.ltvOverrideValue &&
        errors["ltvOverrideValue"]
      }
    >
      <Field
        type="number"
        placeholder="LTV at IM"
        className="override-input"
        name="ltvOverrideValue"
      />
    </ErrorField>
    <div className="flex flex-row gap-2 ">
      <ErrorField
        errorMsg={errors.startDate && touched.startDate && errors["startDate"]}
      >
        <Field
          type="date"
          placeholder="Valid From"
          className="override-input"
          name="startDate"
        />
      </ErrorField>
      <ErrorField
        errorMsg={errors.endDate && touched.endDate && errors["endDate"]}
      >
        <Field
          type="date"
          placeholder="Valid Till"
          className="override-input"
          name="endDate"
        />
      </ErrorField>
    </div>
    <ErrorField
      errorMsg={
        errors.ltvOverrideNote &&
        touched.ltvOverrideNote &&
        errors["ltvOverrideNote"]
      }
    >
      <Field
        type="text"
        placeholder="Why are you adding this override?"
        className="override-input"
        name="ltvOverrideNote"
      />
    </ErrorField>
  </>
);

export default OverridesForm;
