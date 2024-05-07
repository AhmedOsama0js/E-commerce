import React, { useState } from "react";
import css from "./NavBtn.module.css";
import { HiBell } from "react-icons/hi2";
import { HiMiniBellAlert } from "react-icons/hi2";



const NotificationsButton = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Selected item: ${item}`);
    setDropdownOpen(false);
  };

  return (
    <div className={css.dropdown}>
      <button className="btn" onClick={toggleDropdown}>
        {isDropdownOpen ? <HiBell/> : <HiMiniBellAlert/>}
      </button>

      {isDropdownOpen && (
        <ul className={css.dropdownMenu}>
          <li onClick={() => handleItemClick("Item 1")}>Item 1</li>
          <li onClick={() => handleItemClick("Item 2")}>Item 2</li>
          <li onClick={() => handleItemClick("Item 3")}>Item 3</li>
          <li onClick={() => handleItemClick("Item 4")}>Item 4</li>
          <li onClick={() => handleItemClick("Item 5")}>Item 5</li>
          <li onClick={() => handleItemClick("Item 6")}>Item 6</li>
          <li onClick={() => handleItemClick("Item 7")}>Item 7</li>
        </ul>
      )}
    </div>
  );
};

export default NotificationsButton;
