import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

// Pending Payments Api
export const pendingPaymentsApi = createAsyncThunk(
  "pendingPayments/pendingPaymentsApi",
  async () => {
    const respond = await axiosApi.get(
      "/schemepayment/admin/pendingpayment/count"
    );
    return respond.data;
  }
);

// Pending Payments Single Api
export const pendingPaymentsSingleApi = createAsyncThunk(
  "pendingPayments/pendingPaymentsSingleApi",
  async (id) => {
    const respond = await axiosApi.get(
      `/schemepayment/admin/pendingpayment/transactions/${id}`
    );
    return respond.data;
  }
);

// Pending Payments Confirmation Api
export const pendingpaymentsConfirmationApi = createAsyncThunk(
  "pendingPayments/pendingpaymentsConfirmationApi",
  async (data) => {
    const respond = await axiosApi.post(
      `/schemepayment/admin/payment/status/update/${data?.personId}`,
      { status: data.status }
    );
    return respond.data;
  }
);

// Pending Payments AcceptAll Api
export const pendingpaymentsAcceptAllApi = createAsyncThunk(
  "pendingPayments/pendingpaymentsAcceptAllApi",
  async (agentId) => {
    const respond = await axiosApi.post(
      `/schemepayment/admin/status/update/all/${agentId}`
    );
    return respond.data;
  }
);

const initialState = {
  pendingPayments: {},
  pendingPaymentsSingle: {},
};

const pendingPaymentSlice = createSlice({
  name: "pendingPayments",
  initialState,
  reducers: {},
  extraReducers: {
    [pendingPaymentsApi.fulfilled]: (state, action) => {
      state.pendingPayments = action.payload;
    },
    [pendingPaymentsSingleApi.fulfilled]: (state, action) => {
      state.pendingPaymentsSingle = action.payload;
    },
  },
});

export default pendingPaymentSlice.reducer;
