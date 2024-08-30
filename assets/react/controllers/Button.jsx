import React from "react";

export default function Button({
  className,
  children,
  type = "submit",
  onClick,
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={
        "h-10 min-w-32  rounded-md button font-bold disabled:opacity-50 hover:bg-opacity-90 disabled:hover:bg-opacity-100 active:bg-opacity-80 text-secondary transition-all duration-150 ease-in-out " +
        className
      }>
      {children}
    </button>
  );
}
