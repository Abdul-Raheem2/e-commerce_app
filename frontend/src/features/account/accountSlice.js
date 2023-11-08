import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchAccountDetails } from "../../api/account";

export const checkLoggedIn = createAsyncThunk(
    'account/checkLoggedIn',
    async () => {
        const response = await apiFetchAccountDetails();
        if(response.status===401){
            return false;
        }else{
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
    reducers:{
        accountLogOut(state,action){
            state.loggedIn=false;
            state.account={};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkLoggedIn.fulfilled,(state,action)=>{
            if(action.payload){
                state.loggedIn = true;
                state.account = action.payload
            }else{
                state.loggedIn=false;
                state.account = {};
            }
        })
    }
});

export const {accountLogOut} = accountSlice.actions;
export default accountSlice.reducer;