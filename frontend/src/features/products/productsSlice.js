import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiFetchProducts } from "../../api/products";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return await (await apiFetchProducts()).json();
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products:[]
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=action.payload;
        })
    }

});

export default productsSlice.reducer;