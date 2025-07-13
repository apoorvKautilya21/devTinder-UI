import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import { setFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

export default function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const fetchFeed = useCallback(async () => {
    const res = await axios.get(`${API_URL}/user/feed`, {
      withCredentials: true,
    });

    dispatch(setFeed(res.data));
  }, [dispatch]);

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!feed)
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <span className="loading loading-bars loading-lg"></span>
  //     </div>
  //   );

  return (
    <div className="flex justify-center items-center my-6">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
}
