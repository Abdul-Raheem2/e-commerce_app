import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiFetchProducts,apiFetchProduct,apiFetchCategories,apiFetchProductsByCategory } from "../../api/products";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return await (await apiFetchProducts()).json();
    }
)

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category) => {
        return await (await apiFetchProductsByCategory(category)).json();
    }
)

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (productId) => {
        return await (await apiFetchProduct(productId)).json();
    }
)

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        return await (await apiFetchCategories()).json();
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        categories:[],
        products:[],
        product:{}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=action.payload;
        })
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            state.product=action.payload;
        })
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            const categories=action.payload;
            state.categories = categories.map((category)=>{
                return {
                    value:category,
                    label:category
                }
            })
            state.categories.unshift({
                value: 'all',
                label: 'All',
            })
        })
        builder.addCase(fetchProductsByCategory.fulfilled,(state,action)=>{
            state.products=action.payload;
        })
    }

});

export default productsSlice.reducer;