import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import predictionReducer from "./predictionSlice";
import rankReducer from "./rankSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    prediction: predictionReducer,
    rank: rankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
