import React from "react";

// type - alert-info, alert-success, alert-warning, alert-error
export default function Notification({ message, type = "alert-success" }) {
  return (
    <div className="toast toast-top toast-center">
      <div className={`alert ${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}
