import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosApi } from "./AxiosMethod"



// SignIn OTP Api
export const signInOTPApi = createAsyncThunk("authentication/signInOTPApi", async (input) => {
    const respond = await axiosApi.post("/admin/send/otp",{phone:input});
    console.log(respond.data);
    return respond.data?.id;
})

// SignIn Api
export const signInApi = createAsyncThunk("authentication/signInApi", async (input)=> {
    const respond = await axiosApi.post("/admin/login/otp", input);
    console.log(respond.data);
    if(respond?.data?.token){
        localStorage.setItem("token", respond?.data?.token);
    }
    return respond?.data?.token;
})

// Logout Api

export const logoutApi = createAsyncThunk("authentication/logoutApi", async () => {
    const respond = await axiosApi.post("/logout");
    console.log(respond.data);
    localStorage.removeItem("token");
    return respond.data;
})



const initialAuthState = {
    userId: "",
    isAuthenticated: false,
}

const authSlice = createSlice({
    name:"authentication",
    initialState: initialAuthState,
    reducers:{},
    extraReducers:{
        [signInOTPApi.fulfilled]: (state, action) => {
            state.userId = action.payload;
        },
        [signInApi.fulfilled]: (state, action) => {
            const token = action.payload;
            if (token) {
                state.isAuthenticated = true;
            }
        },
        [logoutApi.fulfilled]: (state, action) => {
            const response = action.payload;
            if (response) {
                state.isAuthenticated = false;
            }
        },
    }
})

export default authSlice.reducer;