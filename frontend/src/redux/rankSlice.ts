import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserVoteRank {
    nick: string;
    total_count:number;
}

interface PostVoteRank {
    title: string;
}

interface RankState {
    rankUsers : UserVoteRank[];
    rankPosts : PostVoteRank[];
}

const initialState: RankState = { rankUsers : [], rankPosts: []};

const rankSlice = createSlice({
    name: "rank",
    initialState,
    reducers : {
      setRankUsers : (state, action: PayloadAction<UserVoteRank[]>) => {
        state.rankUsers = action.payload;
      },
      setRankPosts : (state, action: PayloadAction<PostVoteRank[]>) => {
        state.rankPosts = action.payload;
      },
      
    }
});

export const { setRankUsers, setRankPosts } = rankSlice.actions; 
export default rankSlice.reducer;