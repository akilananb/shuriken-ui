import { Field, useField } from "formik";
import ErrorField from "@/components/common/ErrorField";
import LTVSearchInput from "../../common/ltv_search_input";

const OverridesForm = ({ errors, touched }) => {
  const [instrumentField, instrumentMeta, instrumentHelpers] =
    useField("instrumentId");
  return (
    <>
      <ErrorField
        errorMsg={
          errors.instrumentId && touched.instrumentId && errors["instrumentId"]
        }
      >
        <LTVSearchInput
          name="instrumentId"
          value={instrumentField.value}
          onSelectedItem={(value) => instrumentHelpers.setValue(value)}
          error={instrumentMeta.touched && instrumentMeta.error}
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
          errorMsg={
            errors.startDate && touched.startDate && errors["startDate"]
          }
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
};

export default OverridesForm;
