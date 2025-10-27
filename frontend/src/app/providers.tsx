"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setCategories } from "@/redux/categorySlice";
import { useEffect } from "react";
import { setPrediction } from "@/redux/predictionSlice";

export default function Providers({
  children,
  initialCategories,
  initialPredictions
}: {
  children: React.ReactNode;
  initialCategories: [];
  initialPredictions: [];
}) {
  useEffect(() => {
    if (initialCategories) {
      store.dispatch(setCategories(initialCategories));
    }
  }, [initialCategories]);

  useEffect(() => {
    if (initialPredictions) {
      store.dispatch(setPrediction(initialPredictions));
    }
  }, [initialPredictions]);

  return <Provider store={store}>{children}</Provider>;
}
