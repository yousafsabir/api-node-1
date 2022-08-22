import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Statuses from "../../constants/Statuses";
import Actions from "../../constants/Actions";

// Api Url
const API_URL = "/api/goals/";
export const createGoal = createAsyncThunk(
    "goals/create",
    async (args, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.post(API_URL, args, config);
            return res.data;
        } catch (error) {
            const message =
                error.response.data.message ||
                error.message ||
                error.toString();
            console.log("error message:", message);
            thunkApi.rejectWithValue(message);
        }
    }
);

export const getGoals = createAsyncThunk("goals/get", async (_, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios.get(API_URL, config);
        return res.data;
    } catch (error) {
        console.log(error);
        const message =
            error.response.data.message || error.message || error.toString();
        console.log("error message:", message);
        thunkApi.rejectWithValue(message);
    }
});
export const deleteGoal = createAsyncThunk(
    "goals/delete",
    async (args, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.delete(API_URL + args, config);
            return args;
        } catch (error) {
            console.log(error);
            const message =
                error.response.data.message ||
                error.message ||
                error.toString();
            console.log("error message:", message);
            thunkApi.rejectWithValue(message);
        }
    }
);
export const updateGoal = createAsyncThunk(
    "goals/update",
    async (args, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.put(
                API_URL + args._id,
                { title: args.title, desc: args.desc },
                config
            );
            return args;
        } catch (error) {
            console.log(error);
            const message =
                error.response.data.message ||
                error.message ||
                error.toString();
            console.log("error message:", message);
            thunkApi.rejectWithValue(message);
        }
    }
);

const goal = createSlice({
    name: "goal",
    initialState: {
        goals: [],
        status: Statuses.idle,
        action: Actions.idle,
        editMode: false,
        toEdit: null,
    },
    reducers: {
        setEditDoc: (state, action) => {
            state.toEdit = action.payload;
            state.editMode = true;
        },
    },
    extraReducers: (builder) => {
        // For Create Goal
        builder
            .addCase(createGoal.pending, (state) => {
                state.status = Statuses.loading;
                toast("🕓 Creating goal");
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.goals.push(action.payload.goal);
                state.status = Statuses.idle;
                toast("✔ Goal created");
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.status = Statuses.error;
                toast(`🔺 Error: ${action.payload}`);
            })
            // Get Goals
            .addCase(getGoals.pending, (state) => {
                state.action = Actions.readgoal;
                state.status = Statuses.loading;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.goals = action.payload.goals;
                state.status = Statuses.idle;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.status = Statuses.error;
                toast(`🔺 Error: ${action.payload}`);
            })
            // Delete Goal
            .addCase(deleteGoal.pending, (state) => {
                state.action = Actions.deletegoal;
                state.status = Statuses.loading;
                toast("🕓 Deleting goal");
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter(
                    (goal) => goal._id !== action.payload
                );
                state.status = Statuses.idle;
                toast("✔ Deleted successfully");
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.status = Statuses.error;
                toast(`🔺 Error: ${action.payload}`);
            })
            // For Update Goal
            .addCase(updateGoal.pending, (state) => {
                state.action = Actions.updategoal;
                state.status = Statuses.loading;
                toast("🕓 Updating goal");
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.goals = state.goals.map((goal) => {
                    if (goal._id === action.payload._id) {
                        return {
                            ...goal,
                            title: action.payload.title,
                            desc: action.payload.desc,
                        };
                    } else {
                        return goal;
                    }
                });
                state.status = Statuses.idle;
                toast("✔ Updated successfully");
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.status = Statuses.error;
                toast(`🔺 Error: ${action.payload}`);
            });
    },
});

export const { setEditDoc } = goal.actions;

export default goal.reducer;
