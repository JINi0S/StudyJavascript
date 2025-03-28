import React from "react";
import './Alert.css';

const Alert = ({ message, isVisible }) => {
  return isVisible ? (
    <div className="alert">
      {message}
    </div>
  ) : null;
};

export default Alert;