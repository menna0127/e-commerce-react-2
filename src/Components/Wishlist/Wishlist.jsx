import React, { useContext, useEffect, useState } from 'react';
import styles from './Wishlist.module.css';
import { WishlistContext } from '../Context/WishlistContext';
import { cartContext } from '../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Wishlist() {

  let {getLoggedUserWishlist , removeProductWishlist} = useContext(WishlistContext);

  let {addToCart} = useContext(cartContext);

  const [wishlistDetails, setWishlistDetails] = useState(null);

  async function getWishlist() {

    let {data} = await getLoggedUserWishlist();
    setWishlistDetails(data);
    
  }

  async function removeProduct(id) {

    let {data} = await removeProductWishlist(id);
    setWishlistDetails(data);
    
  }

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

  useEffect(() => {
    getWishlist();
  }, [])

  return <>

{wishlistDetails ? 

<div className="w-75 m-auto bg-main-light p-3">

    <div className="cart-head my-4 p-3">

       <div className="crt-tit">
        <h3>My wishlist</h3>
       </div>

    </div>

    {wishlistDetails.data.map((product)=>  

    <div key={product.id} className="row g-3 my-3 border-bottom p-2 ">

      <div className="col-md-2 ">
        <div className="img">
          <img className='w-100' src={product.imageCover} alt="img" />
        </div>
      </div>

      <div className="col-md-10">

        <div className='d-flex justify-content-between align-items-center'>

          <div className="tit pt-5">
          <h3 className='cart-tit'>{product.title.split(' ').slice(0,3).join(' ')}</h3>
          <h6 className='cart-pri text-main'>{product.price} EGP</h6>
          <button onClick={()=>removeProduct(product.id)} className='btn text-danger p-0'><i className="fa-solid fa-trash-can"></i> Remove</button>
          </div>
          
          <div>
          <button onClick={()=> addProduct(product._id)} className='btn brdr-main'>Add To Cart</button>
          </div>
          
        </div>

      </div>

    </div>

    )}

</div> 

:

<div >

 <div className="w-75 m-auto bg-main-light p-3 crt-tit mt-5">

  <h3> Wishlist</h3>
  <h6>Wishlist is empty</h6>

 </div>

</div>

 
}

   
  </>
}
