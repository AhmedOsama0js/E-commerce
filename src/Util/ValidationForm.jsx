import * as Yup from "yup";

export const categoryFormValid = Yup.object().shape({
  name: Yup.string().required(" is required").min(3, " must be at least 3"),
  image: Yup.mixed().required(" is required")

});

export const subcategoryFormValid = Yup.object().shape({
  name: Yup.string().required(" is required").min(3, " must be at least 3"),
  category: Yup.string().required(" You must choose one"),
  image: Yup.mixed().required(" is required"),
});

export const productFormValid = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  colors: Yup.array().required("Color is required"),
  description: Yup.string().required("Description is required"),
  coverImage: Yup.mixed().required("cover Image is required"),
  Images: Yup.mixed().required(" Images is required"),
  price: Yup.number().required("Price is required"),
  priceAfterDiscount: Yup.string().required("Discount is required"),
  quantity: Yup.number().required("Quantity is required"),
  ratingQuantity: Yup.number().required("Rating is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Subcategory is required"),
  brand: Yup.string().required("Brand is required"),
});




export const brandFormValid = Yup.object().shape({
  name: Yup.string().required(" is required").min(3, " must be at least 3"),
  image: Yup.mixed().required("Image is required"),
});

export const getMeFormValid = Yup.object().shape({
  name: Yup.string()
    .required(" is required")
    .min(3, " must be at least 3")
    .test(
      "notEmpty",
      " name cannot be empty",
      (value) => value.trim().length > 0
    ),
  phone: Yup.string().required(" is required").min(11, " must be at least 11"),
});
