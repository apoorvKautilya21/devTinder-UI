import React, { useCallback, useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { API_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <main className="pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
