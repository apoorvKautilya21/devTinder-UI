import axios from "axios";
import React, { useCallback } from "react";
import { API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

export default function UserCard({ user, isLoading, removeOnClick }) {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = useCallback(
    async (status, userId) => {
      try {
        await axios.post(
          `${API_URL}/request/send/${status}/${userId}`,
          {},
          { withCredentials: true }
        );

        dispatch(removeFeed(userId));
      } catch {
        // handle error
      }
    },
    [dispatch]
  );

  if (isLoading) {
    return (
      <div className="card card-compact bg-base-300 w-96 h-96 shadow-xl">
        <div className="card-body flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }
  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="User Profile" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {age}, {gender === "male" ? "Male" : "Female"}
          </p>
        )}
        <p className="mt-4">{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (removeOnClick) {
                return;
              }

              handleSendRequest("ignored", user._id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              if (removeOnClick) {
                return;
              }

              handleSendRequest("interested", user._id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
