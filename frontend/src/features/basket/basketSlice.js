import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchBasket,apiAddProductToBasket } from "../../api/basket";
;

export const fetchBasket = createAsyncThunk(
    'basket/fetchBasket',
    async () => {
        return await (await apiFetchBasket()).json();
    }
)
export const addProductToBasket = createAsyncThunk(
    'basket/addProductToBasket',
    async (productId) => {
        return await apiAddProductToBasket();
    }
)

const basketSlice = createSlice({
    name:'basket',
    initialState:{
        basket:{}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBasket.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.basket = action.payload;
        })
    }
});

export default basketSlice.reducer;