import { createReducer } from "@reduxjs/toolkit";
import { clearError, endLoading, startLoading, throwError } from "../actions";
import { RootState } from "../types";

const initialState: RootState = {
    loading: 0,
    error: ''
}

const rootReducer = createReducer(initialState, (builder) => {
    builder.addCase(startLoading, (state) => {
        state.loading++;
    });
    builder.addCase(endLoading, (state) => {
        state.loading--;
    });
    builder.addCase(throwError, (state, action) => {
        state.error = action.payload;
    });
    builder.addCase(clearError, (state) => {
        state.error = undefined;
    });
})

export default rootReducer;