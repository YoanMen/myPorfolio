import React from "react";
import { createRoot } from "react-dom";
import Notification from "./Notification.js";

export function showNotification(message) {
  const container = document.createElement("div");

  const root = createRoot(container);
  root.render(<Notification message={message} />);
}

export default showNotification;
