"use client";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setCategories } from "@/redux/categorySlice";
import { setUser, clearUser } from "@/redux/userSlice";

export default function InitDataLoader() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = sessionStorage.getItem("loginUser");
    if (!token) return;

    axios
      .get("http://localhost:8000/auth/check-login", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(setUser({ ...res.data, isLogin: true })))
      .catch(() => {
        dispatch(clearUser());
        sessionStorage.removeItem("loginUser");
      });

    axios.get("http://localhost:8000/stats/update", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return null;
}
