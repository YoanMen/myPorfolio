import React, { useState, useEffect } from "react";
import QuillEditor from "./QuillEditor.js";
import { showNotification } from "./showNotification.js";
import { inputValidation } from "../../../scripts/inputValidation.js";

export default function AboutForm({ about }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null)
  const onChange = (value) => {
    setError(inputValidation.about(value.trim()));
    setValue(value);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const contentError = inputValidation.about(value.trim());

    if(!contentError) {
      saveBtn.disabled = true;

      const response = await fetch("/admin/about", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: value
        })
       });

       if (response.ok) {
        const result = await response.json();

        if (result.success) {
          showNotification("Le contenu du à propos a été modifié");
        } else {
          showNotification("Impossible d'envoyer le contenu du à propos vérifier les informations envoyées");
        }

        saveBtn.disabled = false;
      }
     }
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
      {error && <small className="text-red">{error}</small>}
    </form>
  );
}
