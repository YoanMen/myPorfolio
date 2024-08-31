import React, { useState } from "react";
import InputField from "./InputField.js";
import TextAreaField from "./TextAreaField.js";
import Button from "./Button.js";
import { inputValidation } from "../../../scripts/inputValidation.js";
import { showNotification } from "./showNotification.js";

export default function FormContact() {
  const [disableForm, setDisableForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null,
  });
  const [informations, setInformations] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();

    const nameError = inputValidation.name(informations.name);
    const emailError = inputValidation.email(informations.email);
    const messageError = inputValidation.message(informations.message);

    setErrors({
      ...errors,
      name: nameError,
      email: emailError,
      message: messageError,
    });

    if (!nameError && !errors.email && !errors.message) {
      setLoading(true);
      sendData(informations);
    }
  };

  const sendData = async (data) => {
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          setDisableForm(true);
          showNotification(
            "Votre message a été envoyé, vous serez rapidement contacté"
          );
        }
      } else {
        showNotification(
          "Impossible d'envoyer votre message vérifier les informations envoyées"
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showNotification(
        "Impossible d'envoyer votre message une erreur interne est survenu, réessayer plus tard "
      );
    }
  };

  const onHandleName = (value) => {
    value = value.trim();
    setErrors({ ...errors, name: inputValidation.name(value) });
    setInformations({ ...informations, name: value });
  };
  const onHandleEmail = (value) => {
    value = value.trim();
    setErrors({ ...errors, email: inputValidation.email(value) });
    setInformations({ ...informations, email: value });
  };
  const onHandleMessage = (value) => {
    value = value.trim();
    setErrors({ ...errors, message: inputValidation.message(value) });
    setInformations({ ...informations, message: value });
  };

  return (
    <form onSubmit={onHandleSubmit} className="mt-4">
      <div className="flex gap-4 max-md:flex-col mb-4">
        <InputField
          disabled={disableForm}
          type="text"
          label="nom"
          id="name"
          error={errors.name}
          onChange={onHandleName}
        />
        <InputField
          disabled={disableForm}
          type="text"
          label="adresse e-mail"
          id="email"
          error={errors.email}
          onChange={onHandleEmail}
        />
      </div>
      <TextAreaField
        disabled={disableForm}
        label="message"
        id="message"
        error={errors.message}
        onChange={onHandleMessage}
      />
      <div className="flex gap-4 mt-4 max-md:flex-col">
        <label className="flex gap-2 items-start text-xs cursor-pointer">
          <input
            required={true}
            type="checkbox"
            name="checkbox consent  "
            id="checkbox"
          />{" "}
          En cochant cette case, je consens à ce que mes données soient
          utilisées pour me recontacter au sujet de ma demande et ne seront ni
          stockées ni partagées avec des tiers, voir politique de
          confidentialité.
        </label>
        <Button disabled={disableForm} className={"bg-button"}>
          {!loading ? (
            "Envoyer"
          ) : (
            <svg
              className="mx-auto text-2xl"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          )}
        </Button>
      </div>
    </form>
  );
}
