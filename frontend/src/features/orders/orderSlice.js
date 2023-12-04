import { createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import { apiFetchOrders,apiFetchOrderDetails } from "../../api/orders";

export const fetchOrders = createAsyncThunk(
    'basket/fetchOrders',
    async (thunkApi) => {
        const response = await apiFetchOrders();
        if(response.ok){
            return await response.json();
        }else{
            thunkApi.rejectWithValue(response);
        }
    }
)

export const fetchOrdersDetails = createAsyncThunk(
    'basket/fetchOrderDetails',
    async ({orderId},thunkApi) => {
        const response = await apiFetchOrderDetails(orderId);
        if(response.ok){
            return await response.json();
        }else{
            thunkApi.rejectWithValue(response);
        }
    }
)

const ordersSlice = createSlice({
    name:'orders',
    initialState:{
        orders: [],
        selectedOrder:{products:[]}
    },
    reducers:{
        UnselectOrder(state,action){
            state.selectedOrder = {products:[]};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled,(state,action)=>{
            state.orders = action.payload;
        })
        builder.addCase(fetchOrdersDetails.fulfilled,(state,action)=>{
            state.selectedOrder = action.payload;
        })
    }
});

export default ordersSlice.reducer;
export const {UnselectOrder} = ordersSlice.actions;