import React, { useState } from 'react';
import styles from './ForgetPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


export default function ForgetPassword() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState(null);

  let navigate = useNavigate();

  let formik = useFormik({

    initialValues:{
      email:'',
    
    },
    onSubmit:forgetPass

  })

  async function forgetPass(values) {
    setIsLoading(true);
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`, values)
    .catch((error)=> error);

    setIsLoading(false);

    console.log(data)

    if (data.statusMsg === 'success') {
      navigate('/verify')
      
     };
  }

  return <>

  <form className='p-5' onSubmit={formik.handleSubmit}>
    <p className='fw-bold'>please enter your email</p>
    <input placeholder='Email' type="email" id='email' name='email' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>

    {isLoading?<button className='btn bg-main text-white'>
    <ColorRing
      visible={true}
      height="30"
      width="30"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#fff', '#ffff', '#ffff', '#ffff', '#ffff']}
   />
    </button> :

      <button type="submit"  className='btn bg-main text-white'>Send</button>      

    }  

  
  </form>
    
  </>
}
