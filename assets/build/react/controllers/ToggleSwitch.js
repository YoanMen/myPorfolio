import React, { useState } from "react";
import "../../../styles/toggleSwitch.css";
export default function ToggleSwitch({
  id,
  name,
  onChange,
  className,
  checked,
  disabled
}) {
  const [isChecked, setIsChecked] = useState(checked);
  const onHandleChange = value => {
    setIsChecked(value.target.checked);
    onChange(value.target.checked);
  };
  return /*#__PURE__*/React.createElement("label", {
    form: id,
    className: "toggle-switch " + className
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    name: name,
    type: "checkbox",
    onChange: onHandleChange,
    checked: isChecked,
    disabled: disabled
  }), /*#__PURE__*/React.createElement("span", {
    class: "toggle"
  }));
}