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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled,(state,action)=>{
            state.orders = action.payload;
        })
        builder.addCase(fetchOrdersDetails.fulfilled,(state,action)=>{
            let orderDetails = action.payload;
            const orderIndex = state.orders.findIndex(order=>order.id===orderDetails.id);
            if(orderIndex!==-1){
                state.orders[orderIndex] = orderDetails;
            }
        })
    }
});

export default ordersSlice.reducer;