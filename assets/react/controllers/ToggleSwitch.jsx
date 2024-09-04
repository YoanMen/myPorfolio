import React from "react";
import "../../../styles/toggleSwitch.css";

export default function ToggleSwitch({ id, label, checked, onChange }) {
  return (
    <label class="switch">
      <input className="bg-secondary"  type="checkbox"/>
      <span class="slider round"></span>
    </label>   
  );
}