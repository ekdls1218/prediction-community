import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string | null,
    nick: string  | null,
    psa: string | null,
    token: string | null,
    isLogin: boolean
}

const initialState : UserState = {id:null, nick:null, psa:null, token:null, isLogin:false}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser : (state, action : PayloadAction<UserState>) => {
            console.log(action.payload)
            state.id  = action.payload.id;
            state.nick = action.payload.nick;
            state.psa = action.payload.psa;
            state.token = action.payload.token;
            state.isLogin = action.payload.isLogin
        },
        clearUser: (state) => {
            state.id  = null;
            state.nick = null;
            state.psa = null;
            state.token = null;
            state.isLogin = false;
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;