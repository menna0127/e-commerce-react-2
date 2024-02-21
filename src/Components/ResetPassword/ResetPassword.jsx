import React, { useContext, useState } from 'react';
import styles from './ResetPassword.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ColorRing } from 'react-loader-spinner';
import * as Yup from'yup'
import { UserContext } from '../Context/UserContext';

export default function ResetPassword() {

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let {setUserToken} = useContext(UserContext);

  

  let formik = useFormik({

    initialValues:{
      email:'',
      newPassword:''
     
    },
    
    onSubmit:resetPass

  })

  async function resetPass(values) {
    setIsLoading(true);
    let {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`, values)
    .catch((error)=> error);

    setIsLoading(false);

    console.log(data)

    localStorage.setItem('userToken', data.token);
    setUserToken(data.token);
    navigate('/');
    
  }

  // let passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;

  // let validationSchema = Yup.object({

  //   email:Yup.string().email('Invalid email address').required('Required'),
  //   newPassword:Yup.string().matches(passwordRegex,'password is invalid').required('Required'),

  // })

  return <>

<form className='p-5' onSubmit={formik.handleSubmit}>
    <p className='fw-bold'>reset your account password</p>
    <input placeholder='Email' type="email" id='email' name='email' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
    {/* {formik.touched.email&&formik.errors.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:null} */}

    <input type="password" name='newPassword' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur} placeholder='New Password' />
    {/* {formik.touched.newPassword&&formik.errors.newPassword?<div className='alert alert-danger p-2 mt-2'>{formik.errors.newPassword}</div>:null} */}

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

      <button type="submit"  className='btn bg-main text-white'>Reset Password</button>      

    }  

  
  </form>
    
  </>
}
