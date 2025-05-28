"use client";

import MainBoard from "@/components/home/MainBoard";
import SideBoardLeft from "@/components/home/SideBoardLeft";
import SideBoardRight from "@/components/home/SideBoardRight";
import { setCategories } from "@/redux/categorySlice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    axios.get("http://localhost:8000/category").then((res) => {
      dispatch(setCategories(res.data))
    })
  }, [dispatch])

  return (
    <div className="flex gap-6 w-full h-full px-6 py-4">
      <SideBoardLeft />
      <MainBoard />
      <SideBoardRight />
    </div>
  );
}