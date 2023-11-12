import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchBasket,apiAddProductToBasket, apiUpdateQuantity, apiRemoveFromBasket } from "../../api/basket";
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
    async ({productId,quantity}) => {
        const response = await apiAddProductToBasket(productId,quantity);
        if(response.ok){
            return await response.json();
        }else{
            console.log(response);
        }
    }
)


export const updateQuantity = createAsyncThunk(
    'basket/updateQuantity',
    async ({productId,quantity}) =>{
        const response = await apiUpdateQuantity(productId,quantity);
        if(response.ok){
            return await response.json();
        }else{
            console.log(response);
        }
    }
)

export const removeFromBasket = createAsyncThunk(
    'basket/removeFromBasket',
    async (productId) => {
        const response = await apiRemoveFromBasket(productId);
        if (response.ok){
            return productId;
        }else{
            console.log(response);
        }
    }
)

const basketSlice = createSlice({
    name:'basket',
    initialState:{
        basket:{products:[]}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBasket.fulfilled,(state,action)=>{
            state.basket = action.payload;
        })
        builder.addCase(addProductToBasket.fulfilled,(state,action)=>{
            state.basket.products.push(action.payload);
        })
        builder.addCase(updateQuantity.fulfilled,(state,action)=>{
            const updatedProductIndex = state.basket.products.findIndex((product)=>product.id==action.payload.id);
            state.basket.products[updatedProductIndex].quantity = action.payload.quantity;
        })
        builder.addCase(removeFromBasket.fulfilled,(state,action)=>{
            state.basket.products = state.basket.products.filter((product)=>product.id!=action.payload);
        })
    }
});

export default basketSlice.reducer;