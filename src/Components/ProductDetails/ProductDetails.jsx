import React, { useContext, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { cartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { toast } from 'react-hot-toast';


export default function ProductDetails() {

  const {addToCart} = useContext(cartContext);
  const {addToWishlist} = useContext(WishlistContext);

  const [colorState, setColorState] = useState(false);

  async function addProductCart(productId) {

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

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let {isLoading , isError , data} = useQuery('productDetails', ()=> getProductDetails(id));

  console.log(data?.data.data);

  let{id} = useParams();

  return <>

   <div className="row py-5 g-4">

    <div className="col-md-4">

      <div className="img">
        <img src={data?.data.data.imageCover} className='w-100' alt="" />
      </div>

    </div>

    <div className="col-md-8 py-5">

      <div className="details">

        <h2 className='font-bold my-3'>{data?.data.data.title}</h2>

        <p>{data?.data.data.description}</p>

        <div className="price d-flex justify-content-between my-4">
          <span>{data?.data.data.price} EGP</span>

          <span><i className="fa-solid fa-star star"></i> {data?.data.data.ratingsAverage}</span>

        </div>

        <div className="d-flex justify-content-around mt-2">
            <button onClick={()=> addProductCart(data?.data.data.id)}  className='btn bg-main text-white px-5 w-75'><i className="fa-solid fa-plus"></i> add</button>
            <span><i className={colorState? 'fa-solid fa-heart wish-red cursor-pointer' :'fa-regular fa-heart wish cursor-pointer' } onClick={()=> addProductWishlist(data?.data.data._id)}></i></span>
        </div>
        {/* fa-solid fa-heart */}
        {/* // <i class="fa-regular fa-heart"></i> */}
      </div>

    </div>

   </div>
    
  </>
}
