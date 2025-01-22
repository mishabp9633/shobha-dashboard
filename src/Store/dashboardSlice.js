import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

// Dashboard Count Api
export const dashboardCountApi = createAsyncThunk(
  "dashboard/dashboardCountApi",
  async () => {
    const respond = await axiosApi.get("/static/admin/dashboard/data");
    return respond.data;
  }
);

// Gold Rate Get Api
export const goldRateGetApi = createAsyncThunk(
  "dashboard/goldRateGetApi",
  async () => {
    const respond = await axiosApi.get("/goldrate/admin/all");

    return respond?.data;
  }
);

// Gold Rate Update Api
export const goldRateUpdateApi = createAsyncThunk(
  "dashboard/goldRateUpdateApi",
  async (data) => {
    const respond = await axiosApi.put(`/goldrate/admin/${data?.goldRateId}`, {
      gramRate: data?.gramRateAsNumber,
    });

    return respond?.data;
  }
);

// Find New Joint Requests Api
export const jointRequestsApi = createAsyncThunk(
  "dashboard/jointRequestsApi",
  async () => {
    const respond = await axiosApi.get(
      "/scheme/admin/new/jointrequest?page=1&&limit=4"
    );
    return respond.data;
  }
);

// Find New Joint Request Confirm Api

export const jointRequestsConfirmApi = createAsyncThunk(
  "dashboard/jointRequestsConfirmApi",
  async (data) => {
    const respond = await axiosApi.post(`/scheme/admin/status/${data?.id}`, {
      status: data.status,
    });
    console.log(respond.data);

    return respond.data;
  }
);

// Find New Joint SingleView Api

export const jointSigleViewApi = createAsyncThunk(
  "dashboard/jointSigleViewApi",
  async (id) => {
    const respond = await axiosApi.get(`/scheme/admin/${id}`);
    return respond.data;
  }
);

// Recent Transactions Api

export const recentTransactionsApi = createAsyncThunk(
  "dashboard/recentTransactionsApi",
  async () => {
    const respond = await axiosApi.get(
      "/schemepayment/admin/all?page=1&&limit=5"
    );

    return respond.data;
  }
);

const initialState = {
  totalCounts: {},
  goldRate: {},
  jointRequests: [],
  singleView: {},
  recentTransactions: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: {
    [dashboardCountApi.fulfilled]: (state, action) => {
      state.totalCounts = action.payload;
    },
    [goldRateGetApi.fulfilled]: (state, action) => {
      state.goldRate = action.payload?.GoldRates?.[0];
    },
    [jointRequestsApi.fulfilled]: (state, action) => {
      state.jointRequests = action.payload?.Schemes;
    },
    [jointSigleViewApi.fulfilled]: (state, action) => {
      state.singleView = action.payload;
    },
    [recentTransactionsApi.fulfilled]: (state, action) => {
      state.recentTransactions = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
