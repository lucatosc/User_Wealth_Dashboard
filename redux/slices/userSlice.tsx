import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    user: any;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;