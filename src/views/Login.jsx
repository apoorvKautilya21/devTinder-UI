import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { ComponentMap } from "../components/ComponentsMap";

export default function Login() {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const metadata = useMemo(() => {
    if (isSignup)
      return [
        {
          id: "firstName",
          label: "First Name",
          value: formData.firstName || "",
          onChange: (e) =>
            setFormData({ ...formData, firstName: e.target.value }),
          componentType: "text",
        },
        {
          id: "lastName",
          label: "Last Name",
          value: formData.lastName || "",
          onChange: (e) =>
            setFormData({ ...formData, lastName: e.target.value }),
          componentType: "text",
        },
        {
          id: "emailId",
          label: "Email ID",
          value: formData.emailId || "",
          onChange: (e) =>
            setFormData({ ...formData, emailId: e.target.value }),
          componentType: "iconText",
          iconType: "username",
        },
        {
          id: "password",
          label: "Password",
          value: formData.password || "",
          onChange: (e) =>
            setFormData({ ...formData, password: e.target.value }),
          componentType: "iconText",
          iconType: "password",
        },
      ];

    return [
      {
        id: "emailId",
        label: "Email ID",
        value: formData.emailId,
        onChange: (e) => setFormData({ ...formData, emailId: e.target.value }),
        componentType: "iconText",
        iconType: "username",
      },
      {
        id: "password",
        label: "Password",
        value: formData.password,
        onChange: (e) => setFormData({ ...formData, password: e.target.value }),
        componentType: "iconText",
        iconType: "password",
      },
    ];
  }, [formData, isSignup]);

  const handleLoginOrSignup = useCallback(async () => {
    try {
      let res;
      if (!isSignup) {
        res = await axios.post(
          `${API_URL}/login`,
          {
            emailId: formData.emailId,
            password: formData.password,
          },
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
        navigate("/");
      } else {
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.emailId ||
          !formData.password
        ) {
          setError("Please fill all the fields");
          return;
        }
        res = await axios.post(
          `${API_URL}/signup`,
          {
            emailId: formData.emailId,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          { withCredentials: true }
        );

        dispatch(addUser(res?.data?.data));
        navigate("/profile");
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }, [
    isSignup,
    dispatch,
    navigate,
    formData.emailId,
    formData.password,
    formData.firstName,
    formData.lastName,
  ]);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">
            {isSignup ? "Signup" : "Login"}
          </h2>
          {metadata.map((item) => {
            const Component = ComponentMap[item.componentType];
            return <Component key={item.id} {...item} />;
          })}
          {error && (
            <div className="text-red-500">
              <span>{error}</span>
            </div>
          )}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full text-white"
              onClick={handleLoginOrSignup}
            >
              {isSignup ? "Signup" : "Login"}
            </button>
          </div>

          <div className="flex justify-left items-center mt-6 mb-2">
            <button
              className="text-blue-500"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login here"
                : "Don't have an account? Signup here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
