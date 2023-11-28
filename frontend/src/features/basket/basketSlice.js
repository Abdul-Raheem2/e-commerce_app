import { createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import { apiFetchBasket,apiAddProductToBasket, apiUpdateQuantity, apiRemoveFromBasket } from "../../api/basket";
import notify from '../../utils/toast';

export const fetchBasket = createAsyncThunk(
    'basket/fetchBasket',
    async (thunkApi) => {
        const response = await apiFetchBasket();
        if(response.ok){
            return await response.json();
        }else{
            thunkApi.rejectWithValue(response);
        }
    }
)
export const addProductToBasket = createAsyncThunk(
    'basket/addProductToBasket',
    async ({productId,quantity},thunkApi) => {
        const response = await apiAddProductToBasket(productId,quantity);
        if(response.ok){
            notify.success('Added to basket');
            return await response.json();
        }else{
            console.log(response);
            return thunkApi.rejectWithValue(response);
        }
    }
)


export const updateQuantity = createAsyncThunk(
    'basket/updateQuantity',
    async ({productId,quantity},thunkApi) =>{
        const response = await apiUpdateQuantity(productId,quantity);
        if(response.ok){
            notify.success('Quantity Updated');
            return await response.json();
        }else{
            //newAlert('Error updating quantity','error');
            console.log(response);
            return thunkApi.rejectWithValue(response);
        }
    }
)

export const removeFromBasket = createAsyncThunk(
    'basket/removeFromBasket',
    async ({productId},thunkApi) => {
        const response = await apiRemoveFromBasket(productId);
        if (response.ok){
            notify.info('Product removed from basket');
            return productId;
        }else{
            //newAlert('Error removing product from basket','error');
            console.log(response);
            return thunkApi.rejectWithValue(response);
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