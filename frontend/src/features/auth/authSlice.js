import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Statuses from "../../constants/Statuses";
import Actions from "../../constants/Actions";

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

// thunks

const API_URL = "/api/users/";
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
            toast(`🔺 Error: ${message}`);
        }
    }
);
export const login = createAsyncThunk("auth/login", async (args, thunkApi) => {
    try {
        // pending
        thunkApi.dispatch(setAction(Actions.login));
        thunkApi.dispatch(setStatus(Statuses.loading));
        toast("🕓 logging in");
        const res = await axios.post(API_URL + "login", args);
        // on success
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        thunkApi.dispatch(setUser(res.data.user));
        thunkApi.dispatch(setAction(Actions.login));
        thunkApi.dispatch(setStatus(Statuses.idle));
        toast("✔ logged in successfully");
    } catch (error) {
        // error
        thunkApi.dispatch(setAction(Actions.login));
        thunkApi.dispatch(setStatus(Statuses.error));
        console.log("error:", error);
        const message =
            error.response.data.message || error.message || error.toString();
        console.log("error message:", message);
        toast(`🔺 Error: ${message}`);
    }
});

export const logout = createAsyncThunk("auth/logout", (args, thunkApi) => {
    thunkApi.dispatch(setAction(Actions.logout));
    thunkApi.dispatch(setStatus(Statuses.loading));
    toast("🕓 logging out");
    localStorage.removeItem("user");
    thunkApi.dispatch(setUser(null));
    thunkApi.dispatch(setAction(Actions.logout));
    thunkApi.dispatch(setStatus(Statuses.idle));
    toast("✔ logged out successfully");
});

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
