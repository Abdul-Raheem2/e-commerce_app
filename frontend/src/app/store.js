import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import basketReducer from '../features/basket/basketSlice';
import accountReducer from '../features/account/accountSlice';

export default configureStore({
    reducer:{
        products:productsReducer,
        basket:basketReducer,
        account:accountReducer
    }
})