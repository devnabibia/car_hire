import * as Yup from "yup";

  export const EditVihicleSchema = Yup.object().shape({
    vihicle_name: Yup.string().required("Vihicle name is required"),
    vihicle_type: Yup.string().required("Vihicle type Required"),
    badge: Yup.string().oneOf(["hire", "sale"]).required("Badge is required"),
    transmission_type: Yup.string()
      .oneOf(["automatic", "manual"])
      .required("Transmission type required"),

    vihicle_images: 
      Yup.mixed()
          .required("required")
          .test("fileSize", "File Size is too large", (value: any) => {
            if (value && value?.length === 0) {
              return false;
            }
            if (value && value?.length > 0) {
              for (let i = 0; i < value.length; i++) {
                if (value[i].size > 5 * 1024 * 1024) {
                  return false;
                }
              }
            }
            return true;
          })
          .test("fileType", "Unsupported File Format", (value: any) => {
            if (value && value.length > 0) {
              for (let i = 0; i < value.length; i++) {
                if (
                  value[i].type != "image/png" &&
                  value[i].type != "image/jpg" &&
                  value[i].type != "image/jpeg"
                ) {
                  return false;
                }
              }
            }
            return true;
          })
       ,

    hire_price: Yup.number()
      .min(2000, "Must be greeter than 2000.")
      .required("Hire price required"),
    no_of_passengers: Yup.number()
      .min(0, "Must be greeter than 0.")
      .required("no. of passengers required"),
    location: Yup.string()
      .oneOf(["nairobi", "mombasa", "nakuru"])
      .required("Location is required"),
    description: Yup.string().required("Description required"),
    features: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one feature"),
    fuel_consumption: Yup.number()
      .min(0, "Must be greeter than 0.")
      .required("Consumption required"),
  });

;

export const AddVihicleSchema = Yup.object().shape({
  vihicle_name: Yup.string().required("Vihicle name is required"),
  vihicle_type: Yup.string().required("Vihicle type Required"),
  badge: Yup.string().oneOf(["hire", "sale"]).required("Badge is required"),
  transmission_type: Yup.string()
    .oneOf(["automatic", "manual"])
    .required("Transmission type required"),

  vihicle_images: Yup.mixed()
    .test("fileSize", "File Size is too large", (value: any) => {
      if (value && value?.length === 0) {
        return false;
      }
      if (value && value?.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 5 * 1024 * 1024) {
            return false;
          }
        }
      }
      return true;
    })
    .test("fileType", "Unsupported File Format", (value: any) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (
            value[i].type != "image/png" &&
            value[i].type != "image/jpg" &&
            value[i].type != "image/jpeg"
          ) {
            return false;
          }
        }
      }
      return true;
    })
    .required("Select atleast one image"),

  hire_price: Yup.number()
    .min(2000, "Must be greeter than 2000.")
    .required("Hire price required"),
  no_of_passengers: Yup.number()
    .min(0, "Must be greeter than 0.")
    .required("no. of passengers required"),
  location: Yup.string()
    .oneOf(["nairobi", "mombasa", "nakuru"])
    .required("Location is required"),
  description: Yup.string().required("Description required"),
  features: Yup.array().of(Yup.string()).min(1, "Select at least one feature"),
  fuel_consumption: Yup.number()
    .min(0, "Must be greeter than 0.")
    .required("Consumption required"),
});
