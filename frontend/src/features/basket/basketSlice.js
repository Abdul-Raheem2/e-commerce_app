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
    async ({productId,quantity,newAlert}) => {
        const response = await apiAddProductToBasket(productId,quantity);
        if(response.ok){
            newAlert('Added to basket','success');
            return await response.json();
        }else{
            newAlert('Error adding product to basket','error');
            console.log(response);
        }
    }
)


export const updateQuantity = createAsyncThunk(
    'basket/updateQuantity',
    async ({productId,quantity,newAlert}) =>{
        const response = await apiUpdateQuantity(productId,quantity);
        if(response.ok){
            newAlert('Quantity Updated','success');
            return await response.json();
        }else{
            newAlert('Error updating quantity','error');
            console.log(response);
        }
    }
)

export const removeFromBasket = createAsyncThunk(
    'basket/removeFromBasket',
    async ({productId,newAlert}) => {
        const response = await apiRemoveFromBasket(productId);
        if (response.ok){
            newAlert('Product removed from basket','info');
            return productId;
        }else{
            newAlert('Error removing product from basket','error');
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
            const updatedProductIndex = state.basket.products.findIndex((product)=>parseInt(product.id)===parseInt(action.payload.id));
            state.basket.products[updatedProductIndex].quantity = action.payload.quantity;
        })
        builder.addCase(removeFromBasket.fulfilled,(state,action)=>{
            state.basket.products = state.basket.products.filter((product)=>parseInt(product.id)!==parseInt(action.payload));
        })
    }
});

export default basketSlice.reducer;