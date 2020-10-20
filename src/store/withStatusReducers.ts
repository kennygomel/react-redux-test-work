import { PayloadAction } from '@reduxjs/toolkit';
import { FetchStatus } from '../models/fetchStatus.model';

export const withStatusReducers = <T extends any,
    V extends {status: FetchStatus; data: T}>() => ({
    start: (state: V) => {
        state.status = FetchStatus.Loading;
        return state;
    },

    success: (state: V, action: PayloadAction<T>) => {
        state.status = FetchStatus.Finished;
        state.data = action.payload;
        return state;
    },

    error: (state: V) => {
        state.status = FetchStatus.Error;
        return state;
    },
});
