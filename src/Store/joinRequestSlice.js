import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

export const joinRequestsApi = createAsyncThunk(
  "joinRequest/joinRequestsApi",
  async () => {
    const respond = await axiosApi.get(
      "/scheme/admin/new/jointrequest?page=1&&limit=10"
    );
    return respond.data;
  }
);

const initialState = {
    joinRequests:{},
};

const joinrequestSlice = createSlice({
  name: "joinRequest",
  initialState,
  reducers: {},
  extraReducers: {
    [joinRequestsApi.fulfilled]: (state, action) => {
        state.joinRequests = action.payload;
      },
  },
});

export default joinrequestSlice.reducer;
