import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

export default function Profile() {
  const user = useSelector((state) => state.user);

  return user && <EditProfile user={user} />;
}
