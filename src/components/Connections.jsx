import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnections } from "../utils/connectionsSlice";

export default function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnections = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch {
      // handle error
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConnections();

    return () => {
      dispatch(removeConnections());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!connections)
    return (
      <div className="flex justify-center w-screen mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  if (connections.length === 0)
    return (
      <div className="text-center my-10">
        <h1 className="text-2xl font-bold">No connections found</h1>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold">Connections</h1>

      {connections?.map((connection) => (
        <div
          key={connection._id}
          className="flex items-center gap-4 bg-base-300 rounded-md p-4 m-4 w-1/2 mx-auto"
        >
          <img
            src={connection.photoUrl}
            alt={`${connection.firstName} ${connection.lastName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-left mx-4">
            <h2 className="text-xl font-bold">{`${connection.firstName} ${connection.lastName}`}</h2>
            {connection.age && connection.gender && (
              <p className="text-gray-500">{`${connection.age}, ${connection.gender}`}</p>
            )}
            <p className="text-gray-500">{connection.about}</p>
          </div>
          {/* <div className="flex flex-row gap-2 mt-4">
            <button className="btn btn-primary">View Profile</button>
            <button className="btn btn-primary">Remove Connection</button>
          </div> */}
        </div>
      ))}
    </div>
  );
}
