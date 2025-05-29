import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import predictionReducer from "./predictionSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    prediction: predictionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
