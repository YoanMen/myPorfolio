import React, { useState } from "react";
export default function SelectItem({
  id,
  name,
  icon,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    key: id,
    className: "flex gap-2 items-center cursor-pointer w-fit group hover:line-through hover:opacity-80 transition-opacity duration-300 ease-in-out"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl fill-text",
    dangerouslySetInnerHTML: {
      __html: icon
    }
  }), /*#__PURE__*/React.createElement("span", null, name));
}