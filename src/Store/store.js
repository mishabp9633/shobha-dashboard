// const { configureStore } = require("@reduxjs/toolkit");
import { configureStore } from "@reduxjs/toolkit";
import agentsReducer from "./agentSlice";
import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import pendingPaymentReducer from "./pendingPaymentSlice";
import usersReducer from "./userSlice";
import passwordReducer from "./passwordSlice";
import joinRequestReducer from "./joinRequestSlice";
import notJoinedReducer from "./notJoinedSlice";
import transactionsReducer from "./transactionsSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    agents: agentsReducer,
    pendingPayments: pendingPaymentReducer,
    users: usersReducer,
    password: passwordReducer,
    joinRequest: joinRequestReducer,
    notJoined: notJoinedReducer,
    transactions: transactionsReducer,
    products: productReducer,
  },
});
