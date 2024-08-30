import React from "react";
import InputField from "./InputField.js";
import TextAreaField from "./TextAreaField.js";
import Button from "./Button.js";

export default function FormContact() {
  return (
    <form class="mt-4">
      <div class="flex gap-4 max-md:flex-col mb-4">
        <InputField type="text" label="nom" id="username" />
        <InputField type="text" label="adresse e-mail" id="email" />
      </div>
      <TextAreaField label="message" id="message" />
      <div class="flex gap-4 mt-4 max-md:flex-col">
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
        <Button disabled={false} className={"bg-button"}>
          {"Envoyer"}
        </Button>
      </div>
    </form>
  );
}
