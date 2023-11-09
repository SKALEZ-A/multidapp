import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
}
const PrimaryButton = ({ text, onClick }: Props) => {
  return (
    <button onClick={onClick} className="primary-button">
      <p>{text}</p>
    </button>
  );
};

export default PrimaryButton;
