import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const modules = {
  toolbar: [[{
    header: [1, 2, false]
  }], ["bold", "italic", "underline", "strike", "blockquote", "code-block"], [{
    list: "ordered"
  }, {
    list: "bullet"
  }, {
    indent: "-1"
  }, {
    indent: "+1"
  }], ["link", "image"], ["clean"]]
};
const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "code-block"];
export default function QuillEditor({
  onChange,
  value
}) {
  const [isFocused, setIsFocused] = useState(false); // État pour vérifier si Quill est en focus

  const handleFocus = () => {
    setIsFocused(true);
    console.log("focus");
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "container",
    className: "w-full h-full border-stroke border-[1px] rounded-md p-4 bg-secondary " + (isFocused ? " border-white border-opacity-50 border-[1px]" : "")
  }, /*#__PURE__*/React.createElement(ReactQuill, {
    bounds: "#container",
    theme: "bubble",
    modules: modules,
    formats: formats,
    value: value,
    onChange: onChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  }));
}