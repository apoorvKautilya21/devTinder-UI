import React, { useCallback, useMemo, useState } from "react";
import TextBox from "./TextBox";
import Dropdown from "./Dropdown";
import TextArea from "./TextArea";
import UserCard from "./UserCard";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import Notification from "./Notification";

const ComponentMap = {
  text: TextBox,
  dropdown: Dropdown,
  textarea: TextArea,
};

export default function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age,
    gender: user.gender,
    about: user.about,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToaster, setShowToaster] = useState(false);
  const dispatch = useDispatch();

  const metadata = useMemo(() => {
    return [
      {
        id: "firstName",
        label: "First Name",
        value: formData.firstName,
        onChange: (e) =>
          setFormData({ ...formData, firstName: e.target.value }),
        type: "text",
      },
      {
        id: "lastName",
        label: "Last Name",
        value: formData.lastName,
        onChange: (e) => setFormData({ ...formData, lastName: e.target.value }),
        type: "text",
      },
      {
        id: "photoUrl",
        label: "Photo URL",
        value: formData.photoUrl,
        onChange: (e) => setFormData({ ...formData, photoUrl: e.target.value }),
        type: "text",
      },
      {
        id: "age",
        label: "Age",
        value: formData.age,
        onChange: (e) => setFormData({ ...formData, age: e.target.value }),
        type: "text",
      },
      {
        id: "gender",
        label: "Gender",
        value: formData.gender,
        type: "dropdown",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
        onChange: (value) => setFormData({ ...formData, gender: value }),
      },
      {
        id: "about",
        label: "About",
        value: formData.about,
        onChange: (e) => setFormData({ ...formData, about: e.target.value }),
        type: "textarea",
      },
    ];
  }, [formData]);

  const handleSave = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`${API_URL}/profile/edit`, formData, {
        withCredentials: true,
      });
      setIsLoading(false);
      setError(null);
      dispatch(addUser(res.data));
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  }, [dispatch, formData]);

  return (
    <div className="flex justify-center items-center mt-5 gap-8">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          {metadata.map((item) => {
            const Component = ComponentMap[item.type];

            return <Component key={item.label} {...item} />;
          })}
          {error && (
            <div className="text-red-500">
              <span>{error}</span>
            </div>
          )}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-accent"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
      <UserCard user={formData} isLoading={isLoading} />
      {showToaster && (
        <Notification
          message="Profile updated successfully"
          type="alert-success"
        />
      )}
    </div>
  );
}
