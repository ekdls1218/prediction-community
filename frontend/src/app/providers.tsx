"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setCategories } from "@/redux/categorySlice";
import { useEffect } from "react";

export default function Providers({
  children,
  initialCategories
}: {
  children: React.ReactNode;
  initialCategories: [];
}) {
  useEffect(() => {
    if (initialCategories) {
      store.dispatch(setCategories(initialCategories));
    }
  }, [initialCategories]);

  return <Provider store={store}>{children}</Provider>;
}
