import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

export const transactionsApi = createAsyncThunk("transactions/transactionsApi", async () => {
    const respond = await axiosApi.get("/schemepayment/admin/all");

    return respond.data;
})


const initialState = {
    transactions: {},
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers:{},
    extraReducers:{
        [transactionsApi.fulfilled]: (state, action) => {
            state.transactions = action.payload;
          },
    },
});

export default transactionsSlice.reducer;