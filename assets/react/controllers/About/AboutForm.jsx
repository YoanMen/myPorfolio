import React, { useState, useEffect } from "react";
import QuillEditor from "../QuillEditor.js";
import { showNotification } from "../showNotification.js";
import { inputValidation } from "../../../../scripts/inputValidation.js";

export default function AboutForm({ about, csrf_token }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [disableForm, setDisableForm] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const onChange = (value) => {
    setError(inputValidation.about(value.trim()));
    setValue(value);
    setIsSaved(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const contentError = inputValidation.about(value.trim());
    setError(contentError);

    if (contentError) {
      return;
    }

    saveBtn.disabled = true;
    setDisableForm(true);

    await fetch("/admin/about", {
      method: "POST",
      body: JSON.stringify({ content: value, csrf_token: csrf_token }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setIsSaved(true);
          return showNotification("Le contenu du a propos a été modifié");
        }

        return showNotification(result.error);
      })
      .catch((error) => {
        showNotification("erreur : " + error);
      })
      .finally(() => {
        setDisableForm(false);
        saveBtn.disabled = false;
      });
  };

  useEffect(() => {
    const beforeUnloadHandler = (event) => {
      if (isSaved) {
        return;
      }
      event.preventDefault();
      event.returnValue = true;
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [isSaved]);

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
    <div className="font-eudoxus">
      <label
        htmlFor="container"
        className="flex flex-col gap-2 mb-2 w-full text-sm font-medium">
        contenu du à propos
      </label>
      <QuillEditor disabled={disableForm} onChange={onChange} value={value} />
      {error && <small className="text-red">{error}</small>}
    </div>
  );
}
