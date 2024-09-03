import React, { useState } from "react";

export default function Table({ data, value, url }) {
  const [openActions, setOpenActions] = useState(null);

  const handleActionsToggle = (id) => {
    setOpenActions(openActions === id ? null : id);
  };

  const deleteRow = (id) => {
    // create confirm modal
  };

  const generateRow = (data) => {
    return data.map((element) => (
      <tr key={element.id} className="h-12 border-b-[1px] border-stroke">
        {generateTd(element)}
        <td className="text-center pr-4 relative">
          <button
            onClick={() => handleActionsToggle(element.id)}
            className="hover:text-button">
            ...
          </button>
          {openActions === element.id && (
            <div className="absolute bg-primary border-stroke border-[1px] rounded-md right-14 flex flex-col items-start py-2 px-4 gap-1">
              <a href={`${url}/${element.id}`}>modifier</a>
              <hr className="border-stroke border-[1px] w-full" />
              <button
                className="text-red"
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
    <table className="table-auto w-full rounded-2xl bg-primary font-eudoxus">
      <thead className="border-b-[1px] border-stroke rounded h-10">
        <tr>
          {generateTh()}
          <th className="pr-4 w-10">actions</th>
        </tr>
      </thead>
      <tbody className="bg-secondary">{generateRow(data)}</tbody>
    </table>
  );
}
