import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import axios from "axios";

export default function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch {
      // handle error
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRequests();

    return () => {
      dispatch(removeRequests());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests)
    return (
      <div className="flex justify-center w-screen mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (requests.length === 0)
    return (
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold">No requests found</h1>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold">Requests</h1>

      {requests?.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request?.user || {};
        return (
          <div
            key={_id}
            className="flex justify-between items-center gap-4 bg-base-300 rounded-md p-4 m-4 w-1/2 mx-auto flex-wrap"
          >
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-left mx-4 flex-1">
              <h2 className="text-xl font-bold">{`${firstName} ${lastName}`}</h2>
              {age && gender && (
                <p className="text-gray-500">{`${age}, ${gender}`}</p>
              )}
              <p className="text-gray-500">{about}</p>
            </div>
            <div className="flex flex-row gap-2 mt-4 flex-1 justify-end">
              <button className="btn btn-secondary mx-2">Reject</button>
              <button className="btn btn-primary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
