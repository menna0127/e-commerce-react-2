import { useFormik } from 'formik';
import React, { useState } from 'react';
import styles from './Register.module.css';
import * as Yup from'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

export default function Register() {

  let navigate = useNavigate();

  const [error, seterror] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  async function submitRegister(values) {

    setIsLoading(true);

   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
   .catch ( (err)=> {
        setIsLoading(false);
        seterror(err.response.data.message) 
      })

   if (data.message === 'success') {
    setIsLoading(false)
    navigate('/login')
    
   };

   console.log(data);
      
  }

  let phoneRegex = /^(?:\+20|0)?1\d{9}$/;
  let passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;


  let validationSchema = Yup.object({

    name:Yup.string().max(15,"Must be 15 characters or less").min(4,'Must be 15 characters or more').required('Required'),
    email:Yup.string().email('Invalid email address').required('Required'),
    password:Yup.string().matches(passwordRegex,'password is invalid').required('Required'),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"repassword doesn't match with password").required('Required'),
    phone:Yup.string().matches(phoneRegex,"phone is invalid").required("Required"),

  })
 
  let formik = useFormik({

    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit:submitRegister

  })
  
  
  // function validate(values){
  //   let error={};
  //   if(!values.name){
  //     error.name='Required Name'
  //   }else if(values.name.length < 3){
  //     error.name='minLenght Must Be More Than 3'
  //   }else if(values.name.length >10){
  //     error.name='maxLenght Must Be less Than 10'
  //   }
  
  //   if(!values.phone){
  //     error.phone='Required Phone'
  //   }else if(!/^01(1245){8}$/.test(values.phone)){
  //     error.phone='Phone Number Must be one of this(010-011-012-014-015)'
  //   }
  
  
  
  //   return error
  // }
  
  
  return <>
    
    <div className="w-75 m-auto py-5">

      {error !== null?<div className='alert alert-danger'>{error}</div>:""}

      <div className="title w-75 m-auto my-3">
        <h2>Register Now:</h2>
      </div>

      <div className="form  ">

        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="name">name:</label>
          <input type="text" id='name' name='name' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
          {formik.touched.name&&formik.errors.name?<div className='alert alert-danger p-2 mt-2'>{formik.errors.name}</div>:null}

          <label htmlFor="email">email:</label>
          <input type="email" id='email' name='email' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
          {formik.touched.email&&formik.errors.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:null}

          <label htmlFor="password">password:</label>
          <input type="password" id='password' name='password' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
          {formik.touched.password&&formik.errors.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:null}

          <label htmlFor="rePassword">rePassword:</label>
          <input type="password" id='rePassword' name='rePassword' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur}/>
          {formik.touched.rePassword&&formik.errors.rePassword?<div className='alert alert-danger p-2 mt-2'>{formik.errors.rePassword}</div>:null}

          <label htmlFor="phone">phone:</label>
          <input type="tel" id='phone' name='phone' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur}/>
          {formik.touched.phone&&formik.errors.phone?<div className='alert alert-danger p-2 mt-2'>{formik.errors.phone}</div>:null}

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
          </button> 
          :<button type="submit" disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white'>Register</button>}

        </form>

      </div>

    </div>
    
  </>
  
}