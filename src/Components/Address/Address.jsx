import React, { useContext , useEffect, useState } from 'react';
import styles from './Address.module.css';
import { useFormik } from 'formik';
import { cartContext } from '../Context/CartContext';


export default function Address() {

  let {payOnline , getLoggedUserCart} = useContext(cartContext);

  const [cartId, setCartId] = useState(null);

  async function getCart() {
      let {data} = await getLoggedUserCart();
      setCartId(data.data._id);
  }

  useEffect(() => {
      getCart();
  }, [])

  async function handleAddressSubmit(values) {

    let response = await payOnline(cartId , 'http://localhost:3000' , values);

    console.log(response?.data.session.url);
    window.location.href = response?.data.session.url;
    
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit: handleAddressSubmit
  })


  return <>

  <div className="container">
    <form className='p-5' onSubmit={formik.handleSubmit}>

      <label htmlFor="details">Details:</label>
      <input type="text" name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id='details' className='form-control w-100 mb-3' />

      <label htmlFor="phone">Phone:</label>
      <input type="text" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' className='form-control w-100 mb-3' />

      <label htmlFor="city">City:</label>
      <input type="text" name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id='city' className='form-control w-100 mb-3' />

      <button type="submit" className='text-center w-100 brdr-main btn'>Pay Now</button>

    </form>
  </div>
    
  </>
}
