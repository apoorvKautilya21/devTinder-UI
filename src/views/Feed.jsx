import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import { removeAllFeed, setFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((state) => state.feed);
  const isFeedPresent = !feed || feed.length === 0;

  const fetchFeed = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/user/feed`, {
        withCredentials: true,
      });

      dispatch(setFeed(res.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFeedPresent]);

  useEffect(() => {
    return () => {
      dispatch(removeAllFeed());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!feed)
    return (
      <div className="flex justify-center w-screen mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  if (feed.length === 0)
    return (
      <div className="text-center my-10">
        <h1 className="text-2xl font-bold">No feed found</h1>
      </div>
    );

  return (
    <div className="flex justify-center items-center my-6">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
}
