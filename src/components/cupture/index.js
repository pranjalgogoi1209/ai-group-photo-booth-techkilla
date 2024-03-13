import React, { useEffect, useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import Webcam from "react-webcam";
import { FiCamera } from "react-icons/fi";
import { MdFlipCameraAndroid } from "react-icons/md";
const Capture = ({ setImgFile, file, handleSubmit }) => {
  const webcamRef = React.useRef(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenshot, setScreenshot] = useState(null);
  const handleCameraToggle = () => {
    setCameraOn(!cameraOn);
    setScreenshot(null);
  };

  // click the picture
  const handleScreenshot = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImgFile({
      ...file,
      choice: screenshot,
    });
    setScreenshot(screenshot);
    setCameraOn(false);
  };

  return (
    <div>
      <div className="capture">
        {cameraOn ? (
          <Webcam ref={webcamRef} />
        ) : screenshot ? (
          <img src={screenshot} />
        ) : (
          ""
        )}
      </div>
      <div className="d-flex pt-3 justify-content-evenly">
        {screenshot ? (
          <>
            <button
              className="btn btn-warning swap-btn"
              onClick={handleCameraToggle}
            >
              <span className="mx-1"> Retake</span>
              <span className="mx-1">
                {" "}
                <MdFlipCameraAndroid />
              </span>
            </button>
            <button className="btn swap-btn" onClick={handleSubmit}>
              <span className="px-2">Next</span>
              <BiArrowFromLeft />
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-warning swap-btn"
              onClick={handleScreenshot}
            >
              <span className="mx-1"> Capture</span>
              <span className="mx-1 pb-2">
                {" "}
                <FiCamera />
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Capture;
