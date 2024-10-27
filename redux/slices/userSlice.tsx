import { createClient } from '@/utils/supabase/client';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

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

export const fetchUser = () => async (dispatch: AppDispatch) => {
    const supabase = createClient();
    dispatch(setLoading());
    try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            dispatch(setError(error.message));
        } else {
            dispatch(setUser(data.user));
        }
    } catch (err) {
        dispatch(setError('Failed to fetch user'));
    }
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