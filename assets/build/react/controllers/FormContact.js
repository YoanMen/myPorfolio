import React from "react";
import InputField from "./InputField.js";
import TextAreaField from "./TextAreaField.js";
import Button from "./Button.js";
export default function FormContact() {
  return /*#__PURE__*/React.createElement("form", {
    class: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    class: "flex gap-4 max-md:flex-col mb-4"
  }, /*#__PURE__*/React.createElement(InputField, {
    type: "text",
    label: "nom",
    id: "username"
  }), /*#__PURE__*/React.createElement(InputField, {
    type: "text",
    label: "adresse e-mail",
    id: "email"
  })), /*#__PURE__*/React.createElement(TextAreaField, {
    label: "message",
    id: "message"
  }), /*#__PURE__*/React.createElement("div", {
    class: "flex gap-4 mt-4 max-md:flex-col"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex gap-2 items-start text-xs cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "checkbox",
    name: "checkbox consent  ",
    id: "checkbox"
  }), " ", "En cochant cette case, je consens \xE0 ce que mes donn\xE9es soient utilis\xE9es pour me recontacter au sujet de ma demande et ne seront ni stock\xE9es ni partag\xE9es avec des tiers, voir politique de confidentialit\xE9."), /*#__PURE__*/React.createElement(Button, {
    disabled: false,
    className: "bg-button"
  }, "Envoyer")));
}