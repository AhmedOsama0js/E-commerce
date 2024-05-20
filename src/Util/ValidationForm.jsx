import * as Yup from "yup";

export const categoryFormValid = Yup.object().shape({
  name: Yup.string().required(" is required").min(3, " must be at least 3"),
  image: Yup.mixed().required(" is required"),
});

export const subcategoryFormValid = Yup.object().shape({
  name: Yup.string().required(" is required").min(3, " must be at least 3"),
  category: Yup.string().required(" You must choose one"),
  image: Yup.mixed().required(" is required"),
});

export const productFormValid = Yup.object().shape({
  title: Yup.string().required(" is required").min(3, " must be at least 3 "),
  description: Yup.string()
    .required(" is required")
    .min(20, " must be at least 20 characters"),
  // coverImage: Yup.mixed().required("Cover Image is required"),
  // Images: Yup.mixed().required("Images are required"),
  price: Yup.number().required("*"),
  priceAfterDiscount: Yup.string().required("*").test(
    "is-less-than-price",
    " must be less than Price",
    function (value) {
      const price = this.parent.price;
      return parseFloat(value) < parseFloat(price);
    }
  ),
  quantity: Yup.number().required("*"),
  category: Yup.string().required(" is required"),
  subCategory: Yup.string().required(" is required"),
  brand: Yup.string().required(" is required"),
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

export const loginFormValid = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string().required("Password is required"),
});

export const signupFormValid = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])/, "Password needs one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Password needs one uppercase letter")
    .matches(/^(?=.*[@$!%*?&])/, "The password requires a (@,$,!,%,*,?,&)"),
  passwordConfirm: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});
