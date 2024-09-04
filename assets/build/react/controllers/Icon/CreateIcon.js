import React, { useState, useEffect } from "react";
import InputField from "../InputField.js";
import TextAreaField from "../TextAreaField.js";
import { inputValidation } from "../../../../scripts/inputValidation.js";
import { showNotification } from "../showNotification.js";
import Switch from "../ToggleSwitch.js";
export default function CreateIcon({
  token_csrf
}) {
  const [errors, setErrors] = useState({
    name: null,
    svg: null
  });
  const [informations, setInformations] = useState({
    name: "",
    svg: ""
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
  const handleSave = async event => {
    event.preventDefault();
    const nameError = inputValidation.checkLength(informations.name.trim(), 60);
    const svgError = inputValidation.checkIsSVG(informations.svg.trim());
    setErrors({
      ...errors,
      name: nameError,
      svg: svgError
    });
    if (nameError || svgError) {
      return;
    }
    await fetch(`/icon/create`, {
      method: "POST",
      body: JSON.stringify({
        name: informations.name,
        svg: informations.svg,
        token_csrf: token_csrf
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        // redirect with a success message
      }
      return showNotification(data.error);
    }).catch(error => showNotification("erreur : " + error));
  };
  const onHandleName = value => {
    value = value.trim();
    setErrors({
      ...errors,
      name: inputValidation.checkLength(value, 60)
    });
    setInformations({
      ...informations,
      name: value
    });
  };
  const onHandleSVG = value => {
    value = value.trim();
    setErrors({
      ...errors,
      svg: inputValidation.checkIsSVG(value)
    });
    setInformations({
      ...informations,
      svg: value
    });
  };
  return /*#__PURE__*/React.createElement("form", {
    method: "POST",
    className: "font-eudoxus flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "technologie"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "nom",
    id: "name",
    className: "max-w-80",
    error: errors.name,
    onChange: onHandleName
  }), /*#__PURE__*/React.createElement(TextAreaField, {
    label: "SVG",
    id: "name",
    error: errors.svg,
    onChange: onHandleSVG
  }));
}