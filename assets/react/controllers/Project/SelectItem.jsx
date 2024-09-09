import React, { useState } from "react";

export default function SelectItem({ id, name, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      key={id}
      className="flex gap-2 items-center cursor-pointer w-fit group hover:line-through hover:opacity-80 transition-opacity duration-300 ease-in-out">
      <div
        className="text-3xl fill-text"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <span>{name}</span>
    </button>
  );
}
