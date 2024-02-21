import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

export let WishlistContext = createContext();

let headers={
    token:localStorage.getItem('userToken')
}

function addToWishlist(id) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId:id
    }
    ,
    {
        headers
    }).then((response)=> response)
    .catch((error)=>error)
    
}

function getLoggedUserWishlist() {

    return axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist',{
        headers
    }).then((response)=> response)
    .catch((error)=>error)
    
}

function removeProductWishlist(id) {

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers
    }).then((response)=> response)
    .catch((error)=>error)
    
}

export default function WishListContextProvider(props) {

    return<WishlistContext.Provider value={{addToWishlist , getLoggedUserWishlist , removeProductWishlist }}>
        {props.children}
    </WishlistContext.Provider>
    
}

