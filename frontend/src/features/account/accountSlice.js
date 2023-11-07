import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchAccountDetails } from "../../api/account";

export const fetchAccountDetails = createAsyncThunk(
    'account/fetchAccountDetails',
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
        setLoggedIn(state,action){
            state.loggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAccountDetails.fulfilled,(state,action)=>{
            if(action.payload){
                state.loggedIn = true;
                state.account = action.payload
            }else{
                state.loggedIn=false;
            }
        })
    }
});

export const {setLoggedIn} = accountSlice.actions;
export default accountSlice.reducer;