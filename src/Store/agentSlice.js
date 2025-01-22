import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "./AxiosMethod";

// get all agents
export const allAgentsGet = createAsyncThunk(
  "agents/allAgentsGet",
  async () => {
    const respond = await axiosApi.get("user/admin/agent/all");
    return respond.data;
  }
);

// get single agent user
export const agentUsers = createAsyncThunk(
  "agents/agentUser",
  async (agentId) => {
    const respond = await axiosApi.get(
      `scheme/admin/agentusers/all/${agentId}`
    );
    return respond.data;
  }
);

// agent create
export const agentCreate = createAsyncThunk(
  "agents/agentCreate",
  async (agentData) => {
    const respond = await axiosApi.post("/user/admin/create/agent", agentData);
    return respond?.data;
  }
);

// agent update
export const agentUpdate = createAsyncThunk(
  "agents/agentUpdate",
  async (updateData) => {
    const respond = await axiosApi.put(
      `/user/admin/update/${updateData?.agentId}`,
      updateData?.data
    );
    return respond?.data;
  }
);

// agent Delete
export const agentDelete = createAsyncThunk(
  "agents/agentDelete",
  async (agentId) => {
    const respond = await axiosApi.delete(
      `/user/admin/delete/agent/${agentId}`
    );
    return respond?.data;
  }
);

const initialAgentState = {
  totalAgent: {},
  totalagentUsers: {},
  createAgent: {},
  updatAgent: {},
  deleteAgent: {},
};

const agentsSlice = createSlice({
  name: "agents",
  initialState: initialAgentState,
  reducers: {},
  extraReducers: {
    [allAgentsGet.fulfilled]: (state, action) => {
      state.totalAgent = action.payload;
    },
    [agentUsers.fulfilled]: (state, action) => {
      state.totalagentUsers = action.payload;
    },
    [agentDelete.fulfilled]: (state, action) => {
      state.deleteAgent = action.payload;
    },
    [agentDelete.rejected]: (state, action) => {
      state.deleteAgent = action.error;
    },
  },
});

export default agentsSlice.reducer;
