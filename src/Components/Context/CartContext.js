import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";


export let cartContext = createContext();

let headers={
    token:localStorage.getItem('userToken')
}

function addToCart(id) {

    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId:id
    }
    ,
    {
        headers:headers
    }).then((response)=> response)
    .catch((error)=> error);
    
}

function getLoggedUserCart() {

    return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart` , {
        headers
    }).then((response)=> response)
    .catch((error)=> error);
    
}

function removeCartItem(id) {

    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}` , {
        headers
    }).then((response)=> response)
    .catch((error)=> error);
    
}

function updateProductQuantity(id , count) {

    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}` ,{
        count
    } 
    , {
        headers
    }).then((response)=> response)
    .catch((error)=> error);
    
}

function payOnline(CartId ,url, values) {

    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${CartId}?url=${url}` ,{
        shippingAddress: values
    } 
    , {
        headers
    }).then((response)=> response)
    .catch((error)=> error);
    
}

function clearCart() {

    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart` , {
        headers
    }).then((response)=> response)
    .catch((error)=> error);
    
}


export default function CartContextProvider(props) {



    return <cartContext.Provider value={{ addToCart , payOnline , getLoggedUserCart , removeCartItem , updateProductQuantity , clearCart}}>

        {props.children}

    </cartContext.Provider>
    
}
