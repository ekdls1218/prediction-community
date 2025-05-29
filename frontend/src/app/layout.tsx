"use client";
import Header from "@/components/Header";
import localFont from "next/font/local";
import "./globals.css";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/redux/store";
import { useEffect } from "react";
import axios from "axios";
import { setCategories } from "@/redux/categorySlice";
import { setPrediction } from "@/redux/predictionSlice";

const pyeongChangPeace = localFont({
  src: [
    {
      path: "../../public/fonts/PyeongChangPeace-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/PyeongChangPeace-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pyeongchang",
  display: "swap",
});

function InitDataLoader () {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    axios.get("http://localhost:8000/category").then((res) => {
      dispatch(setCategories(res.data));
    });
  }, [dispatch]);

  return null;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="ko" className={pyeongChangPeace.variable}>
      <body>
        <Provider store={store}>
          <InitDataLoader />
          <header className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Header />
          </header>
          <main className="h-[calc(100vh-80px)] overflow-hidden">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
