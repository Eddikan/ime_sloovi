import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store/store";

import axios from "axios";
import { loginPayload, appState } from "../../interfaces/task";

const initialState: appState = {
    tasks: [],
    assignedUsers: [],
};
interface taskPayload {
    description: string;
    date: string;
    assingedTime: number;
    assigneduser: string;
}
// actions are processes that get data from backend
export const getUserDropDown = createAsyncThunk(
    "task/getUserDropDown",
    async (_, thunkAPI) => {
        try {
            const store: any = thunkAPI.getState();
            const company_id = store.auth.user.company_id;
            const {
                data: {
                    results: { data },
                },
            } = await axios.get(`/team?product=outreach&company_id=${company_id}`);

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);
export const getAllTasks = createAsyncThunk(
    "task/getAllTasks",
    async (_, thunkAPI) => {
        try {
            const store: any = thunkAPI.getState();
            const company_id = store.auth.user.company_id;
            const {
                data: { results }
            } = await axios.get(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`);
            return results;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const saveTask = createAsyncThunk(
    "task/saveTask",

    async (taskData: taskPayload, thunkAPI) => {
        const store: any = thunkAPI.getState();
        const company_id = store.auth.user.company_id;
        try {
            const { description, date, assingedTime, assigneduser } = taskData;
            // get current time
            const today = new Date();
            const currentTime =
                today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const [hours, minutes, seconds] = currentTime.split(":");
            const totalSeconds: number = +hours * 60 * 60 + +minutes * 60 + +seconds;
            // format to payload structure

            const {
                data
            } = await axios.post(
                `/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
                {
                    assigned_user: assigneduser,
                    task_date: date,
                    task_time: assingedTime,
                    is_completed: 0,
                    time_zone: totalSeconds,
                    task_msg: description,
                }
            );
            thunkAPI.dispatch(getAllTasks())

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        CLEAR(_state) {
            return initialState;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getAllTasks.fulfilled, (state, action) => {
            const response = action.payload;
            state.tasks = response

        });
        builder.addCase(getUserDropDown.fulfilled, (state, action) => {
            const response = action.payload;
            state.assignedUsers = response.map(
                (user: { id: string; name: string }) => {
                    return {
                        id: user.id,
                        name: user.name,
                    };
                }
            );
        });
    },
});

export const { CLEAR } = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.user;

export default taskSlice.reducer;
