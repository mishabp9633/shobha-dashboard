import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

export const passwordVerifyApi = createAsyncThunk(
  "password/passwordApi",
  async (data) => {
    const response = await axiosApi.post("/passcode/verify", {phone:data});
    console.log(response);

    return response.data;
  }
);

const initialState = {};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: {
  },
});

export default passwordSlice.reducer;
