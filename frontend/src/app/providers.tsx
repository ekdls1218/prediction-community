"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setCategories } from "@/redux/categorySlice";
import { useEffect } from "react";
import { setPrediction } from "@/redux/predictionSlice";
import { setRankPosts, setRankUsers } from "@/redux/rankSlice";

export default function Providers({
  children,
  initialCategories,
  initialPredictions,
  initialRankUsers,
  initialRankPosts
}: {
  children: React.ReactNode;
  initialCategories: [];
  initialPredictions: [];
  initialRankUsers: [];
  initialRankPosts: [];
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

  useEffect(() => {
    if (initialRankUsers) {
      store.dispatch(setRankUsers(initialRankUsers));
    }
  }, [initialRankUsers]);

  useEffect(() => {
    if (initialRankPosts) {
      store.dispatch(setRankPosts(initialRankPosts));
    }
  }, [initialRankPosts]);

  return <Provider store={store}>{children}</Provider>;
}
