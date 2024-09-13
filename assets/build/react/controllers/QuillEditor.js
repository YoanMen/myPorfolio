import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const modules = {
  toolbar: [[{
    header: [2, 3, false]
  }], ["bold", "italic", "underline", "strike", "blockquote", "code-block"], [{
    list: "ordered"
  }, {
    list: "bullet"
  }, {
    indent: "-1"
  }, {
    indent: "+1"
  }], ["link", "image"], ["clean"], [{
    align: []
  }]]
};
const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "code-block", "align"];
export default function QuillEditor({
  onChange,
  value,
  disabled
}) {
  const [isFocused, setIsFocused] = useState(false); // État pour vérifier si Quill est en focus

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return /*#__PURE__*/React.createElement(ReactQuill, {
    disabled: disabled,
    className: "w-full h-full border-stroke border-[1px] rounded-md bg-primary font-eudoxus " + (isFocused ? " border-white border-opacity-50 border-[1px]" : "") + (disabled ? "opacity-50" : ""),
    id: "container",
    bounds: "#container",
    theme: "bubble",
    modules: modules,
    formats: formats,
    value: value,
    onChange: onChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  });
}