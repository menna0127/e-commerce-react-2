import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { cartContext } from '../Context/CartContext';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';


export default function Cart() {

  let {getLoggedUserCart , removeCartItem , updateProductQuantity , clearCart} = useContext(cartContext);

  const [cartDetails, setCartDetails] = useState(null);

  async function getCart() {

    let {data} = await getLoggedUserCart();
    console.log(data);
    setCartDetails(data);
    
  }

  async function removeItem (id) {

    let {data} = await removeCartItem(id);
    setCartDetails(data);
    
  }

  async function updateCount(id , count) {

    let {data} = await updateProductQuantity (id , count);
    setCartDetails(data);
    
  }

  async function clearCartItems() {

    let {data} = await clearCart();
    setCartDetails(data);
    
  }

  useEffect(() => {

    getCart();
   
  }, [])
  

  return <>

  {cartDetails ? 

    <div className="w-75 m-auto bg-main-light p-3">

        <div className="cart-head d-flex justify-content-between my-4 p-3">

           <div className="crt-tit">
            <h3>Cart Shop</h3>
            <h6>total price: <span className='text-main'>{cartDetails.data.totalCartPrice}</span></h6>
           </div>

           <div className="crt-hd">
            <Link to={'/address'} className='btn btn-chk p-2 mb-2 text-white'>Checkout</Link >
            <h6>Total number of items: <span className='text-main'>{cartDetails.numOfCartItems}</span></h6>
           </div>

        </div>

        {cartDetails.data.products.map((product)=>  

        <div key={product.product.id} className="row g-3 my-3 border-bottom p-2 ">

          <div className="col-md-2 ">
            <div className="img">
              <img className='w-100' src={product.product.imageCover} alt="img" />
            </div>
          </div>

          <div className="col-md-10">

            <div className='d-flex justify-content-between align-items-center'>

              <div className="tit pt-5">
              <h3 className='cart-tit'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
              <h6 className='cart-pri'>{product.price} EGP</h6>
              <button onClick={()=>removeItem(product.product.id)} className='btn text-danger p-0'><i className="fa-solid fa-trash-can"></i> Remove</button>
              </div>

              <div>
              <button onClick={()=>updateCount(product.product.id , product.count + 1 )} className='btn brdr-main'><i className="fa-solid fa-plus"></i></button>
              <span className='mx-3'>{product.count}</span>
              <button onClick={()=>updateCount(product.product.id , product.count - 1 )} className='btn brdr-main'><i className="fa-solid fa-minus"></i></button>
              </div>

            </div>

          </div>

        </div>

        )}

        {/* <div className="clear my-4 text-center">
          <button onClick={} className='btn brdr-main'>Clear Your Cart</button>
        </div> */}

    </div> 

    :

    <div >

     <div className="w-75 m-auto bg-main-light p-3 crt-tit mt-5">

      <h3>Cart Shop</h3>
      <h6>your cart is empty</h6>

     </div>

    </div>

     
    }

  
    
  </>
}
