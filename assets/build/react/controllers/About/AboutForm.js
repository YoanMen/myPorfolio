import React, { useState, useEffect } from "react";
import QuillEditor from "../QuillEditor.js";
import { showNotification } from "../showNotification.js";
import { inputValidation } from "../../../../scripts/inputValidation.js";
export default function AboutForm({
  about,
  csrf_token
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const onChange = value => {
    setError(inputValidation.about(value.trim()));
    setValue(value);
  };
  const handleSave = async event => {
    event.preventDefault();
    const contentError = inputValidation.about(value.trim());
    setError(contentError);
    if (contentError) {
      return;
    }
    saveBtn.disabled = true;
    await fetch("/admin/about", {
      method: "POST",
      body: JSON.stringify({
        content: value,
        csrf_token: csrf_token
      })
    }).then(res => res.json()).then(result => {
      if (result.success) {
        return showNotification("Le contenu du a propos a été modifié");
      }
      return showNotification(result.error);
    }).catch(error => showNotification("erreur : " + error));
    saveBtn.disabled = false;
  };
  useEffect(() => {
    setValue(about);
  }, [about]);
  useEffect(() => {
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", handleSave);
    }
    return () => {
      if (saveBtn) {
        saveBtn.removeEventListener("click", handleSave);
      }
    };
  }, [value]);
  return /*#__PURE__*/React.createElement("form", {
    className: "w-full h-full sticky top-0 z-30 font-eudoxus"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "container",
    className: "flex flex-col gap-2 mb-2 w-full text-sm font-medium"
  }, "contenu du \xE0 propos"), /*#__PURE__*/React.createElement(QuillEditor, {
    onChange: onChange,
    value: value
  }), error && /*#__PURE__*/React.createElement("small", {
    className: "text-red"
  }, error));
}