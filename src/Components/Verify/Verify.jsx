import React, { useState } from 'react';
import styles from './Verify.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


export default function Verify() {

  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();


  let formik = useFormik({

    initialValues:{
      resetCode:'',
     
    },
    onSubmit:verifyCode

  })

   async function verifyCode(values) {
    setIsLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    .catch((error)=> error);
    setIsLoading(false);
    console.log(data);

    if (data.status === 'Success') {
      navigate('/resetpassword')
      
     };

  }

  return <>

<form className='p-5' onSubmit={formik.handleSubmit}>
    <p className='fw-bold'>please enter your verification code</p>
    {/* <input placeholder='Code' type=''  name='code' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur}/> */}
    <input type="text" placeholder='Code' className='form-control w-100 mb-3' name='resetCode' onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur} />

    {
      isLoading?<button className='btn bg-main text-white'>
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
      <button type="submit"  className='btn bg-main text-white'>Verify</button>
    }
    
    
  </form>
    
  </>
}
