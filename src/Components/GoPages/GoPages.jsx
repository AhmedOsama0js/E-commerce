import React from "react";
import "./GoPages.css";
import { Link, useLocation } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { PiSubtractSquareFill } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdBrandingWatermark } from "react-icons/md";

export default function GoPages() {
  const location = useLocation();
  return (
    <div className="GoPages">
      <Link
        to="/dashboard"
        className={location.pathname === "/dashboard" ? "active " : ""}
        title="Dashboard"
      >
        <span>
          <MdSpaceDashboard />
        </span>
        <span className="name">Dashboard</span>
      </Link>
      <Link
        to="category"
        title="category"
        className={location.pathname === "/dashboard/category" ? "active " : ""}
      >
        <span>
          <BiSolidCategoryAlt />
        </span>
        <span className="name">Category</span>
      </Link>
      <Link
        to="subcategory"
        title="subcategory"
        className={
          location.pathname === "/dashboard/subcategory" ? "active " : ""
        }
      >
        <span>
          <PiSubtractSquareFill />
        </span>
        <span className="name">Subcategory</span>
      </Link>
      <Link
        to="client"
        title="client"
        className={location.pathname === "/dashboard/client" ? "active " : ""}
      >
        <span>
          <RiCustomerService2Fill />
        </span>
        <span className="name">Client</span>
      </Link>
      <Link
        to="product"
        title="Product"
        className={location.pathname === "/dashboard/product" ? "active " : ""}
      >
        <span>
          <MdProductionQuantityLimits />
        </span>
        <span className="name">Product</span>
      </Link>
      <Link
        to="brand"
        title="Brand"
        className={location.pathname === "/dashboard/brand" ? "active " : ""}
      >
        <span>
          <MdBrandingWatermark />
        </span>
        <span className="name">Brand</span>
      </Link>
    </div>
  );
}
