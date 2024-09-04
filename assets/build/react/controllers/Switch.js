import React from "react";
export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: id,
    checked: checked,
    onChange: onChange,
    className: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
  });
}