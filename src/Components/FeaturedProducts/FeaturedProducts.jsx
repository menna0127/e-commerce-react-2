import React, { useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { WishlistContext } from '../Context/WishlistContext';


export default function FeaturedProducts() {

  let {addToCart} = useContext(cartContext);

  let {addToWishlist} = useContext(WishlistContext);

  const [colorState, setColorState] = useState(false);


  async function addProduct(productId) {

    let response = await addToCart(productId);

    if (response.data.status === 'success') {

      toast.success('Product successfully added to cart')
      
    }
    else
    {
      toast.error("error adding product to cart")
    }
    
  };

  async function addProductWishlist(id) {

    setColorState(false);

    let response = await addToWishlist(id);
    console.log(response);

    if (response.data.status === 'success') {

      setColorState(true);

      toast.success('Product successfully added to wishlist')
      
    } else {
      setColorState(false);
      toast.error("error adding product to wishlist")
    }
    
  }


  function getFeaturedProducts() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    
  }

  let {data , isLoading , isError} = useQuery("getFeaturedProducts" , getFeaturedProducts)

  

  return <>

   <div className="">

    <div className="row">

      {data?.data.data?data.data.data.map((product)=> 

      <div key={product._id}  className="col-md-3">

        <div className="product p-3 rounded-2 cursor-pointer">

        <Link to={`/productdetails/${product._id}`}>

          <img className='w-100 rounded-2' src={product.imageCover} alt="cover" />

          <span className='text-main font-sm fw-bolder mt-2'>{product.category.name}</span>

          <h3 className='h6 py-3'>{product.title.split(" ").slice(0,2).join(' ')}</h3>

          <div className="d-flex justify-content-between ">
            <span>{product.price} EGP</span>
            <span><i className="fa-solid fa-star star"></i> {product.ratingsAverage}</span>
          </div>

        </Link>

        <div className="d-flex justify-content-between mt-2"> 
           <button onClick={()=> addProduct(product._id)}  className='btn bg-main text-white px-5'><i className="fa-solid fa-plus"></i> add</button>
           <span ><i className={colorState? 'fa-solid fa-heart wish-red cursor-pointer' :'fa-regular fa-heart wish cursor-pointer' } onClick={()=> addProductWishlist(product._id)}></i></span>
        </div>

        </div>

      </div>

      ) 
      :''}

    </div>

    </div>

  </>

}
