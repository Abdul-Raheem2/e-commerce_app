import './productList.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts, fetchProductsByCategory } from "./productsSlice"
import { useEffect, useState } from "react";
import Select from 'react-select'

import DisplayProduct from "../../components/DisplayProduct";
import { fetchBasket } from '../basket/basketSlice';

export default function ProductList(){
    const dispatch = useDispatch();
    const [selectedCategory,setSelectedCategory] = useState({value: 'all',label: 'All'});

    useEffect(()=>{
        dispatch(fetchCategories());
        dispatch(fetchBasket());
    },[dispatch])

    useEffect(()=>{
        if(selectedCategory.value==='all'){
            dispatch(fetchProducts());
        }else{
            dispatch(fetchProductsByCategory(selectedCategory.value));
        } 
        
    },[dispatch,selectedCategory]);

    const products = useSelector((state)=>state.products.products);
    const categories = useSelector((state)=>state.products.categories);

    function handleCategoryChange(category){
        setSelectedCategory(category);
    }
    return (
        <>
            <label htmlFor="select-category">Category</label>
            <Select id="select-category"value={selectedCategory} onChange={handleCategoryChange} options={categories}/>
            <div id="products">
                {products.map((product)=>{
                    return <DisplayProduct product={product} key={product.id}/>
                })}
            </div>
        </>
    )
}