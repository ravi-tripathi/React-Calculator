import React from "react";

const Button = ({ content, onButtonClick, type }) => {
  return (
    <div
      className={`btn Button ${content === "0" ? "zero" : ""} ${type || ""}`}
      onClick={onButtonClick(content, type)}
    >
      {content}
    </div>
  );
};

export default Button;
