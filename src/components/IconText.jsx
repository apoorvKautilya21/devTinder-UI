import React, { useState } from "react";

const UsernameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70"
  >
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
);

const PasswordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70"
  >
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd"
    />
  </svg>
);

const IconMap = {
  username: UsernameIcon,
  password: PasswordIcon,
};

export default function IconText({ iconType, label, value, onChange, type }) {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = IconMap[iconType];
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        {Icon && <Icon />}
        <input
          type={
            iconType === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          className="grow"
          value={value}
          onChange={onChange}
        />
      </label>

      {iconType === "password" && (
        <div className="form-control mt-4">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="label-text">Show Password</span>
          </label>
        </div>
      )}
    </label>
  );
}
