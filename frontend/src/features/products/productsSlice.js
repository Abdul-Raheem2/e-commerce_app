import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('http://localhost:3000/products');
        return await response.json();
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