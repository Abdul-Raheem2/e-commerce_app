import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchBasket,apiAddProductToBasket } from "../../api/basket";
;

export const fetchBasket = createAsyncThunk(
    'basket/fetchBasket',
    async () => {
        const response = await apiFetchBasket();
        if(response.ok){
            return await response.json();
        }
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
    reducers:{
        basketLogOut(state,action){
            state.basket = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBasket.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.basket = action.payload;
        })
    }
});

export const {basketLogOut} = basketSlice.actions;
export default basketSlice.reducer;