import React, { useState, useEffect } from "react";
import QuillEditor from "./QuillEditor.js";
import { showNotification } from "./showNotification.js";

export default function AboutForm({ about }) {
  const [value, setValue] = useState("");

  const onChange = (value) => {
    setValue(value);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    saveBtn.disabled = true;

    showNotification("le contenu du à propos a été modifier");

    // send to server
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

  return (
    <form className="w-full h-full sticky top-0 z-30">
      <label
        htmlFor="container"
        className="flex flex-col gap-2 mb-2 w-full text-sm font-medium">
        contenu du à propos
      </label>
      <QuillEditor onChange={onChange} value={value} />
    </form>
  );
}
