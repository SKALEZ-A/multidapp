import React from "react";

interface Props {
  text: string;
}

const MobileNavTitle = ({ text }: Props) => {
  return <h6 className="mobile--nav--title">{text}</h6>;
};

export default MobileNavTitle;
