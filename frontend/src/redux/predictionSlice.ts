import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  deadline: string;
  created_at: string;
  category: number;
  userId: string;
}

interface postState {
    post : Post[]
}

const initialState : postState = {post: []}

const predictionSlice = createSlice({
    name:"prediction",
    initialState,
    reducers : {
        setPrediction : (state, action : PayloadAction<Post[]>) => {
            state.post = action.payload
        }
    }
});

export const {setPrediction} = predictionSlice.actions;
export default predictionSlice.reducer;