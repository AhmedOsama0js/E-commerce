
import React, { useState } from "react";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
const BtnFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const element = document.documentElement;

    if (document.fullscreenElement) {
      exitFullscreen();
    } else {
      requestFullscreen(element);
    }

    setIsFullscreen(!isFullscreen);
  };

  const requestFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  return (
      <button className="btn" id="fullscreenButton" onClick={toggleFullscreen}>
        {isFullscreen ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
      </button>
  );
};

export default BtnFullscreen;
