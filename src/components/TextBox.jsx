import React from "react";

export default function TextBox({ label, placeholder, value, onChange }) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full max-w-xs"
      />
    </label>
  );
}
