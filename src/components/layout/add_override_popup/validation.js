import * as Yup from "yup";

export const AddOverrideSchema = Yup.object().shape({
  instrumentId: Yup.string().required("Instrument Id should not be empty"),
  ltvOverrideValue: Yup.number()
    .min(0, "LTV values must be between the range of 0 to 100")
    .max(100, "LTV values must be between the range of 0 to 100")
    .required("LTV values should not be empty"),
  ltvOverrideNote: Yup.string().max(200, "Max of 200 characters"),

  startDate: Yup.date(),
  endDate: Yup.date().min(
    Yup.ref("startDate"),
    "end date can't be before start date"
  ),
});
