import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Statuses from "../../constants/Statuses";
import Actions from "../../constants/Actions";

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const auth = createSlice({
    name: "auth",
    initialState: {
        user: user ?? null,
        status: Statuses.idle,
        action: Actions.idle,
        message: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setAction: (state, action) => {
            state.action = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { setUser, setStatus, setAction, setMessage } = auth.actions;

export default auth.reducer;

// thunks

const API_URL = "http://localhost:8000/api/users/";
// localhost:8000 set in package.json

export const register = createAsyncThunk(
    "auth/register",
    async (args, thunkApi) => {
        try {
            // pending
            thunkApi.dispatch(setStatus(Statuses.loading));
            thunkApi.dispatch(setAction(Actions.register));
            toast("🕓 signing you up");
            const res = await axios.post(API_URL, args);
            // on success
            localStorage.setItem("user", JSON.stringify(res.data.user));
            thunkApi.dispatch(setUser(res.data.user));
            thunkApi.dispatch(setAction(Actions.register));
            thunkApi.dispatch(setStatus(Statuses.idle));
            setTimeout(() => {
                thunkApi.dispatch(setAction(Actions.idle));
            }, 1000);
            toast("✔ Signed in successfully");
        } catch (error) {
            // error
            thunkApi.dispatch(setStatus(Statuses.error));
            thunkApi.dispatch(setAction(Actions.register));
            console.log("error:", error);
            const message =
                error.response.data.message ||
                error.message ||
                error.toString();
            console.log("error message:", message);
            thunkApi.dispatch(setAction(Actions.register));
            toast(`🔺 Error: ${message}`);
        }
    }
);
