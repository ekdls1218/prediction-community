import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import predictionReducer from "./predictionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    prediction: predictionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
