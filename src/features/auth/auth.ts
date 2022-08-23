import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store/store';

import axios from 'axios';
import { loginPayload, appState } from '../../interfaces/auth'

const initialState: appState = {
    user: {
        by_default: "",
        company_id: "",
        icon: "",
        is_first: 0,
        status: "",
        token: "",
        user_id: "",
        want_login: "",
    },
    token: '',
    error: null,
};

// actions are processes that get data from backend

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: loginPayload, thunkAPI) => {
        // create axios instance for login
        try {
            const { email, password } = loginData;
            const instance = axios.create({
                baseURL: 'https://stage.api.sloovi.com/',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const { data: { results } } = await instance.post(`/login`,
                {
                    email: email,
                    password: password
                })

            return results

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LOGOUT(_state) {
            localStorage.removeItem('sloovi-api-token');
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            //    loading state
        });
        builder.addCase(login.fulfilled, (state, action) => {
            // persist details to store and localstorage 
            const response = action.payload;
            state.user = response
            state.token = response.token;
            localStorage.setItem('sloovi-api-token', response.token);
            window.location.reload();
        });
        builder.addCase(login.rejected, (state, action: any) => {
            state.error = action.payload;
        });
    },
});

export const { LOGOUT } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.user;

export default authSlice.reducer;
