import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

// show all user
export const showTotalUserApi = createAsyncThunk(
  "users/showTotalUserApi",
  async () => {
    const response = await axiosApi.get("/scheme/admin/all");
    return response.data;
  }
);

//show single user
export const showSingleUserApi = createAsyncThunk(
  "users/showSingleUserApi",
  async (id) => {
    const response = await axiosApi.get(`/scheme/admin/${id}`);

    return response.data;
  }
);
// show single user table
export const showSingleUserPageTable = createAsyncThunk(
  "users/showSingleUserPageTable",
  async (id) => {
    const response = await axiosApi.get(
      `/scheme/admin/single/user/payments/${id}`
    );
    return response.data;
  }
);

//update single User
export const updateSingleUser = createAsyncThunk(
  "user/updateSingleUser",
  async (data) => {
    const response = await axiosApi.post("user/admin/update/user", data);
    return response.data;
  }
);

//add user
export const createUserApi = createAsyncThunk(
  "users/createUserApi",
  async (input) => {
    const response = await axiosApi.post("user/admin/create/user", input);
    return response.data;
  }
);

//delete user
export const deleteUserApi = createAsyncThunk(
  "users/deleteUserApi",
  async (id) => {
    const response = await axiosApi.delete(`user/admin/delete/${id}`);
    return response.data;
  }
);

export const phoneNumberCheckApi = createAsyncThunk(
  "users/phoneNumberCheckApi",
  async (phoneNumber) => {
    const respond = await axiosApi.post("/create/phone/check", {
      phone: phoneNumber,
    });
    return respond.data;
  }
);

export const aadharNumberCheckApi = createAsyncThunk(
  "users/aadharNumberCheckApi",
  async (aadhaarNo) => {
    const respond = await axiosApi.post("/create/aadhaar/check", {
      aadhaarNo: aadhaarNo,
    });
    return respond.data;
  }
);

const initialState = {
  totalUser: [],
  singleuser: {},
  singleUserTable: [],
  addUser: {},
  updateUser: {},
  deleteUser: {},
  phoneNumberUsed: {},
  aadhaarNoUsed: {},
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [showTotalUserApi.fulfilled]: (state, action) => {
      state.totalUser = action.payload?.Schemes;
    },
    [showSingleUserApi.fulfilled]: (state, action) => {
      state.singleuser = action.payload;
    },
    [showSingleUserPageTable.fulfilled]: (state, action) => {
      state.singleUserTable = action.payload;
    },
    [createUserApi.fulfilled]: (state, action) => {
      state.addUser = action.payload;
    },
    [updateSingleUser.fulfilled]: (state, action) => {
      state.updateUser = action.payload;
    },
    [phoneNumberCheckApi.fulfilled]: (state, action) => {
      state.phoneNumberUsed = action.payload;
    },
    [aadharNumberCheckApi.fulfilled]: (state, action) => {
      state.aadhaarNoUsed = action.payload;
    },
  },
});
export default userSlice.reducer;
