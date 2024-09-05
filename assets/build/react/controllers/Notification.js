import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../../../styles/notification.css";
export default function Notification({
  message
}) {
  const [visible, setVisible] = useState(true);
  const duration = 5000;
  const id = Date.now();
  setTimeout(() => {
    removeNotification();
  }, duration);
  const onHandleClose = () => removeNotification();
  const removeNotification = () => {
    const notification = document.getElementById(id);
    setVisible(false);
    setTimeout(() => {
      if (notification) {
        notification.remove();
      }
    }, 200);
  };
  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", {
    id: id,
    className: ` fixed sm:top-10 flex flex-col sm:gap-2 top-0 z-50 sm:right-10 w-screen sm:max-w-80 p-4 bg-secondary border-stroke border-[1px] sm:rounded-lg ${visible ? "notification-enter" : "notification-exit"}`,
    role: "alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "size-7 my-auto",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mx-auto w-fit text-sm font-normal select-none"
  }, message), /*#__PURE__*/React.createElement("button", {
    "aria-label": "bouton fermer",
    onClick: onHandleClose
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-[2px] bg-stroke mt-4 overflow-hidden rounded"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-button rounded slider"
  }))), document.body);
}