import React from "react";
import { createRoot } from "react-dom";
import ConfirmDialog from "./ConfirmDialog.js";
export function showConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel
}) {
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render( /*#__PURE__*/React.createElement(ConfirmDialog, {
    title: title,
    message: message,
    onConfirm: onConfirm,
    onCancel: onCancel
  }));
}
export default showConfirmDialog;