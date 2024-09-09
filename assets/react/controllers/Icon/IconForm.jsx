import React, { useState, useEffect } from "react";
import InputField from "../InputField.js";
import TextAreaField from "../TextAreaField.js";
import { inputValidation } from "../../../../scripts/inputValidation.js";
import { showNotification } from "../showNotification.js";
import Switch from "../ToggleSwitch.js";

export default function IconForm({
  update = false,
  csrf_token,
  icon = { name: "", svg: "", isTechnology: false },
}) {
  const [errors, setErrors] = useState({ name: null, svg: null });
  const [disableForm, setDisableForm] = useState(false);
  const [informations, setInformations] = useState({
    name: icon.name,
    svg: icon.svg,
    isTechnology: icon.isTechnology,
  });

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
  }, [informations]);

  const handleSave = async (event) => {
    event.preventDefault();
    const nameError = inputValidation.checkLength(informations.name.trim(), 60);
    const svgError = inputValidation.checkIsSVG(informations.svg.trim());

    setErrors({ ...errors, name: nameError, svg: svgError });

    if (nameError || svgError) {
      return;
    }

    saveBtn.disabled = true;
    setDisableForm(true);

    await fetch(`/admin/icon/${update ? icon.id : "create"}`, {
      method: "POST",
      body: JSON.stringify({
        name: informations.name,
        svg: informations.svg,
        isTechnology: informations.isTechnology,
        csrf_token: csrf_token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          document.location.href = "/admin/icon/";
          return;
        }

        setDisableForm(false);
        saveBtn.disabled = false;
        return showNotification(data.error);
      })
      .catch((error) => {
        showNotification("erreur : " + error);
        setDisableForm(false);
        saveBtn.disabled = false;
      });
  };

  const onHandleName = (value) => {
    setErrors({ ...errors, name: inputValidation.checkLength(value, 60) });

    setInformations({ ...informations, name: value });
  };

  const onHandleSVG = (value) => {
    value = value.trim();
    setErrors({ ...errors, svg: inputValidation.checkIsSVG(value) });

    setInformations({ ...informations, svg: value });
  };

  const onHandleIsTechnology = (value) => {
    setInformations({ ...informations, isTechnology: value });
  };

  return (
    <div className="font-eudoxus flex flex-col gap-4">
      <div className="flex gap-4 max-sm:flex-col-reverse">
        <InputField
          label="nom"
          id="name"
          className="max-w-80"
          error={errors.name}
          onChange={onHandleName}
          value={informations.name}
          disabled={disableForm}
        />
        <label
          className="flex flex-col gap-2 justify-start"
          htmlFor="technologie">
          technologie
          <Switch
            name={"technologie"}
            id={"technologie"}
            label="technologie"
            className="mt-1"
            onChange={onHandleIsTechnology}
            checked={informations.isTechnology}
            disabled={disableForm}
          />
        </label>
      </div>
      <TextAreaField
        label="SVG"
        id="svg"
        error={errors.svg}
        onChange={onHandleSVG}
        value={informations.svg}
        disabled={disableForm}
      />
    </div>
  );
}
