import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Dashboard.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Client from "./Pages/Client/Client.jsx";
import Category from "./Pages/Category/Category.jsx";
import Subcategory from "./Pages/Subcategory/Subcategory.jsx";
import Product from "./Pages/Product/Product.jsx";
import Brand from "./Pages/Brand/Brand.jsx";
import Shop from "./Shop.jsx";
import { Provider } from "react-redux";
import store from "./Store/index.js";
import MainAuth from "./Auth/MainAuth.jsx";
import LoginForm from "./Auth/LoginForm/LoginForm.jsx";
import SignupForm from "./Auth/SignupForm/SignupForm.jsx";
import IsAuth from "./Auth/isAuth/IsAuth.jsx";
import MyPage from "./Pages/myPage/MyPage.jsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";
import UserPage from "./Pages/userPage/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shop />,
  },
  {
    path: "login",
    element: <MainAuth element={<LoginForm />} />,
  },
  {
    path: "signup",
    element: <MainAuth element={<SignupForm />} />,
  },
  {
    path: "userPage",
    element: <UserPage /> ,
  },
  {
    path: "dashboard",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <IsAuth>
            <Dashboard />
          </IsAuth>
        ),
      },
      {
        path: "category",
        element: (
          <IsAuth>
            <Category />
          </IsAuth>
        ),
      },
      {
        path: "client",
        element: (
          <IsAuth>
            <Client />
          </IsAuth>
        ),
      },
      {
        path: "subcategory",
        element: (
          <IsAuth>
            <Subcategory />
          </IsAuth>
        ),
      },
      {
        path: "product",
        element: (
          <IsAuth>
            <Product />
          </IsAuth>
        ),
      },
      {
        path: "brand",
        element: (
          <IsAuth>
            <Brand />
          </IsAuth>
        ),
      },
      {
        path: "myPage",
        element: (
          <IsAuth>
            <MyPage />
          </IsAuth>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
