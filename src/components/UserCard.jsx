import React from "react";

export default function UserCard({ user, isLoading }) {
  console.log(user);
  const { firstName, lastName, age, gender, about, photoUrl } = user;

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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}
