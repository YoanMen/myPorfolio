import React, { useState } from "react";
export default function Table({
  data,
  value,
  url
}) {
  const [openActions, setOpenActions] = useState(null);
  const handleActionsToggle = id => {
    setOpenActions(openActions === id ? null : id);
  };
  const deleteRow = id => {
    // create confirm modal
  };
  const generateRow = data => {
    return data.map(element => /*#__PURE__*/React.createElement("tr", {
      key: element.id,
      className: "h-12 border-b-[1px] border-stroke"
    }, generateTd(element), /*#__PURE__*/React.createElement("td", {
      className: "text-center pr-4 relative"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleActionsToggle(element.id),
      className: "hover:text-button"
    }, "..."), openActions === element.id && /*#__PURE__*/React.createElement("div", {
      className: "absolute bg-primary border-stroke border-[1px] rounded-md right-14 flex flex-col items-start py-2 px-4 gap-1"
    }, /*#__PURE__*/React.createElement("a", {
      href: `${url}/${element.id}`
    }, "modifier"), /*#__PURE__*/React.createElement("hr", {
      className: "border-stroke border-[1px] w-full"
    }), /*#__PURE__*/React.createElement("button", {
      className: "text-red",
      onClick: () => deleteRow(element.id)
    }, "supprimer")))));
  };
  const generateTd = element => {
    let td = [];
    for (const key in value) {
      if (element.hasOwnProperty(key)) {
        td.push( /*#__PURE__*/React.createElement("td", {
          key: key,
          className: "text-left pl-4 overflow-hidden text-ellipsis"
        }, element[key].length > 20 ? element[key].substring(0, 100) + "..." : element[key]));
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
    className: "table-auto w-full rounded-2xl bg-primary font-eudoxus"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "border-b-[1px] border-stroke rounded h-10"
  }, /*#__PURE__*/React.createElement("tr", null, generateTh(), /*#__PURE__*/React.createElement("th", {
    className: "pr-4 w-10"
  }, "actions"))), /*#__PURE__*/React.createElement("tbody", {
    className: "bg-secondary"
  }, generateRow(data)));
}