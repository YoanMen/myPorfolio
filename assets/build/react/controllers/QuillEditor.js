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
export default function MyComponent() {
  const [value, setValue] = useState("");
  console.log(value);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ReactQuill, {
    theme: "bubble",
    modules: modules,
    formats: formats,
    value: value,
    onChange: setValue
  }), /*#__PURE__*/React.createElement("div", null, value));
}