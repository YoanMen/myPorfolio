import React, { useState, useEffect } from "react";
import { showConfirmDialog } from "./showConfirmDialog.js";
import showNotification from "./showNotification.js";
export default function Table({
  csrf_token,
  data,
  value,
  url
}) {
  const [openActions, setOpenActions] = useState(null);
  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }), [openActions];
  const clickOutside = event => {
    if (openActions != null) {
      console.log(event.target.closest("button"));
      if (!event.target.closest("button")) {
        setOpenActions(null);
      }
      console.log("close action");
    }
  };
  const handleActionsToggle = id => {
    setOpenActions(openActions === id ? null : id);
  };
  const fetchDelete = async id => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        csrf_token: csrf_token
      })
    }).then(res => res.json()).then(result => {
      if (result.success) {
        return window.location.reload();
      }
      return showNotification(result.error);
    }).catch(error => showNotification("erreur : " + error));
  };
  const deleteRow = id => {
    showConfirmDialog({
      title: "Supprimer cette élément",
      message: "Êtes-vous sûr de vouloir supprimer cette élément ?",
      onConfirm: () => {
        fetchDelete(id);
      },
      onCancel: () => {
        setOpenActions(null);
      }
    });
  };
  const generateRow = data => {
    return data.map(element => /*#__PURE__*/React.createElement("tr", {
      key: element.id,
      className: "h-12 border-b-[1px] border-stroke hover:bg-primary hover:bg-opacity-60 transition-all duration-200 ease-in-out "
    }, generateTd(element), /*#__PURE__*/React.createElement("td", {
      className: "text-center pr-4 relative"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleActionsToggle(element.id),
      className: "hover:text-button"
    }, "..."), openActions === element.id && /*#__PURE__*/React.createElement("div", {
      className: "absolute bg-primary border-stroke border-[1px] rounded-md right-14 flex flex-col items-start py-2 px-4 gap-1"
    }, /*#__PURE__*/React.createElement("a", {
      href: `${url}/${element.id}`,
      className: "hover:text-button transition-colors duration-200 ease-in-out"
    }, "modifier"), /*#__PURE__*/React.createElement("hr", {
      className: "border-stroke border-[1px] w-full"
    }), /*#__PURE__*/React.createElement("button", {
      className: "text-red hover:opacity-80 transition-opacity duration-200 ease-in-out",
      onClick: () => deleteRow(element.id)
    }, "supprimer")))));
  };
  const generateTd = element => {
    let td = [];
    for (const key in value) {
      if (element.hasOwnProperty(key)) {
        if (element[key] === true || element[key] === false) {
          td.push( /*#__PURE__*/React.createElement("td", {
            key: key,
            className: "text-left pl-4 overflow-hidden text-ellipsis"
          }, element[key] ? "oui" : "non"));
        } else {
          td.push( /*#__PURE__*/React.createElement("td", {
            key: key,
            className: "text-left pl-4 overflow-hidden text-ellipsis"
          }, element[key].length > 20 ? element[key].substring(0, 100) + "..." : element[key]));
        }
      }
    }
    return td;
  };
  const generateTh = () => {
    let th = [];
    for (const key in value) {
      th.push( /*#__PURE__*/React.createElement("th", {
        key: key,
        className: "text-left pl-4"
      }, value[key]));
    }
    return th;
  };
  return /*#__PURE__*/React.createElement("table", {
    className: "sm:table-auto table-fixed w-full  rounded-2xl bg-primary font-eudoxus"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "border-b-[1px] border-stroke rounded h-10 w-full"
  }, /*#__PURE__*/React.createElement("tr", null, generateTh(), /*#__PURE__*/React.createElement("th", {
    className: "pr-4 w-10"
  }, "actions"))), /*#__PURE__*/React.createElement("tbody", {
    className: "bg-secondary"
  }, generateRow(data)));
}