import React, { useState, useEffect } from "react";
import { showConfirmDialog } from "./showConfirmDialog.js";
import showNotification from "./showNotification.js";

export default function Table({ csrf_token, data, value, url }) {
  const [openActions, setOpenActions] = useState(null);

  useEffect(() => {
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }),
    [openActions];

  const clickOutside = (event) => {
    if (openActions != null && !event.target.closest("button")) {
      setOpenActions(null);
    }
  };

  const handleActionsToggle = (id) => {
    setOpenActions(openActions === id ? null : id);
  };

  const fetchDelete = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ csrf_token: csrf_token }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          return window.location.reload();
        }

        return showNotification(result.error);
      })
      .catch((error) => showNotification("erreur : " + error));
  };

  const deleteRow = (id) => {
    showConfirmDialog({
      title: "Supprimer cette élément",
      message: "Êtes-vous sûr de vouloir supprimer cette élément ?",
      onConfirm: () => {
        fetchDelete(id);
      },
      onCancel: () => {
        setOpenActions(null);
      },
    });
  };

  const generateRow = (data) => {
    return data.map((element) => (
      <tr
        key={element.id}
        className="h-12 border-b-[1px] border-stroke hover:bg-primary hover:bg-opacity-60 transition-all duration-200 ease-in-out ">
        {generateTd(element)}
        <td className="text-center pr-4 relative">
          <button
            onClick={() => handleActionsToggle(element.id)}
            className="hover:text-button">
            ...
          </button>
          {openActions === element.id && (
            <div className="absolute bg-primary border-stroke border-[1px] rounded-md right-14 flex flex-col items-start py-2 px-4 gap-1">
              <a
                href={`${url}/${element.id}`}
                className="hover:text-button transition-colors duration-200 ease-in-out">
                modifier
              </a>
              <hr className="border-stroke border-[1px] w-full" />
              <button
                className="text-red hover:opacity-80 transition-opacity duration-200 ease-in-out"
                onClick={() => deleteRow(element.id)}>
                supprimer
              </button>
            </div>
          )}
        </td>
      </tr>
    ));
  };

  const generateTd = (element) => {
    let td = [];

    for (const key in value) {
      if (element.hasOwnProperty(key)) {
        if (element[key] === true || element[key] === false) {
          td.push(
            <td
              key={key}
              className="text-left pl-4 overflow-hidden text-ellipsis">
              {element[key] ? "oui" : "non"}
            </td>
          );
        } else {
          td.push(
            <td
              key={key}
              className="text-left pl-4 overflow-hidden text-ellipsis">
              {element[key].length > 20
                ? element[key].substring(0, 100) + "..."
                : element[key]}
            </td>
          );
        }
      }
    }

    return td;
  };

  const generateTh = () => {
    let th = [];
    for (const key in value) {
      th.push(
        <th key={key} className="text-left pl-4">
          {value[key]}
        </th>
      );
    }
    return th;
  };

  return (
    <table className="sm:table-auto table-fixed w-full  rounded-2xl bg-primary font-eudoxus">
      <thead className="border-b-[1px] border-stroke rounded h-10 w-full">
        <tr>
          {generateTh()}
          <th className="pr-4 w-10">actions</th>
        </tr>
      </thead>
      <tbody className="bg-secondary">{generateRow(data)}</tbody>
    </table>
  );
}
