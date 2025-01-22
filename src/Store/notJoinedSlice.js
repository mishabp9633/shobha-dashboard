import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

export const notJoinedApi = createAsyncThunk(
  "notJoined/notJoinedApi",
  async () => {
    const respond = await axiosApi.get("/user/admin/notjoined/all");

    return respond.data;
  }
);

const initialState = {
  notJoined: {},
};

const notJoinedSlice = createSlice({
  name: "notJoined",
  initialState,
  reducers: {},
  extraReducers: {
    [notJoinedApi.fulfilled]: (state, action) => {
      state.notJoined = action.payload;
    },
  },
});

export default notJoinedSlice.reducer;
