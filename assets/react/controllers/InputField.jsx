import React from "react";

export default function InputField({
  type = "text",
  label = "label",
  id = "",
  onChange,
  error,
  disabled,
  autoFocus,
}) {
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-2 w-full text-sm font-medium">
      {label}
      <input
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        name={id}
        id={id}
        type={type}
        className="bg-primary h-10 rounded-md border-stroke border-[1px] px-2 disabled:opacity-50"
      />
      {error && <small className="text-red">{error}</small>}
    </label>
  );
}
