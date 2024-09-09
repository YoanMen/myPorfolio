import React from "react";
import { createPortal } from "react-dom";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  const removeDialog = () => {
    const confirmDialog = document.getElementById("ConfirmDialog");
    confirmDialog.remove();
  };

  return createPortal(
    <div id="ConfirmDialog">
      <div
        id="backgroundModal"
        className="bg-black w-full h-full fixed opacity-40 z-50 top-0 left-0"></div>
      <div
        id="container"
        className={`fixed flex flex-col z-50 right-2/4 top-2/4 -translate-y-2/4 translate-x-2/4 max-w-80 w-full p-4 bg-secondary border-stroke border-[1px] rounded-lg font-eudoxus`}
        role="alert">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{message}</p>
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="hover:text-button  transition-colors duration-200 ease-in-out"
            onClick={() => {
              onConfirm();
              removeDialog();
            }}>
            confirmer
          </button>
          <button
            className="hover:text-button opacity-50 transition-colors duration-200 ease-in-out"
            onClick={() => {
              onCancel();
              removeDialog();
            }}>
            annuler
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
