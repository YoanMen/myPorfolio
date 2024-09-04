import React from "react";
import "../../../styles/toggleSwitch.css";
export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    class: "switch"
  }, /*#__PURE__*/React.createElement("input", {
    className: "bg-secondary",
    type: "checkbox"
  }), /*#__PURE__*/React.createElement("span", {
    class: "slider round"
  }));
}