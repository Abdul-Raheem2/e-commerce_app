import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchAccountDetails } from "../../api/account";

export const checkLoggedIn = createAsyncThunk(
    'account/checkLoggedIn',
    async () => {
        const response = await apiFetchAccountDetails();
        if(response.ok){
            return await response.json();
        }
    }
)

const accountSlice = createSlice({
    name:'account',
    initialState:{
        loggedIn:false,
        account:{}
    },
    extraReducers: (builder) => {
        builder.addCase(checkLoggedIn.fulfilled,(state,action)=>{
            if(action.payload.loggedIn){
                state.loggedIn = true;
                state.account = action.payload.account;
            }else{
                state.loggedIn=false;
                state.account = {};
            }
        })
    }
});

export default accountSlice.reducer;