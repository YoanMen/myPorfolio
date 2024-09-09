import React from "react";

export default function TextAreaField({
  label = "label",
  id = "",
  onChange,
  error,
  disabled,
  value,
}) {
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-2 w-full text-sm font-medium">
      {label}
      <textarea
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        name={id}
        id={id}
        className="bg-primary h-60 rounded-lg border-stroke border-[1px] p-2 resize-none disabled:opacity-50">
        {value}
      </textarea>
      {error && <small className="text-red">{error}</small>}
    </label>
  );
}
