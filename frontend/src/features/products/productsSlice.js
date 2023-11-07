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
    reducers:{
        updateQuantity(state,action){
            const {id,quantity} = action.payload;
            const index = state.products.findIndex((product)=>product.id===id);
            state.products[index].quantityInBasket = quantity;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=action.payload.map((product)=>{
                return {
                    ...product,
                    quantityInBasket: 0
                }
            });
        })
    }

});

export const {updateQuantity} = productsSlice.actions;
export default productsSlice.reducer;