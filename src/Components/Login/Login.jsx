import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { UserContext } from '../Context/UserContext';


export default function Login() {
  

  let {setUserToken} = useContext(UserContext)

  let navigate = useNavigate();

  const [error, seterror] = useState(null);

  const [isLoading, setIsLoading] = useState(false);


  async function loginSubmit(values) {

    setIsLoading(true);

   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
   .catch ( (err)=> {
        setIsLoading(false);
        seterror(err.response.data.message) 
      })

   if (data.message === 'success') {
    setIsLoading(false);
    localStorage.setItem('userToken', data.token);
    setUserToken(data.token);
    navigate('/')
    
   };

   console.log(data);
      
  }

  let passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;


  let validationSchema = Yup.object({

    email:Yup.string().email('Invalid email address').required('Required'),
    password:Yup.string().matches(passwordRegex,'password is invalid').required('Required'),

  })
 
  let formik = useFormik({

    initialValues:{
      email:'',
      password:'',
    },
    validationSchema,
    onSubmit:loginSubmit

  })

  return <>

<div className="w-75 m-auto py-5">

{error !== null?<div className='alert alert-danger'>{error}</div>:""}

<div className="title w-75 m-auto my-3">
  <h2>Register Now:</h2>
</div>

<div className="form  ">

  <form onSubmit={formik.handleSubmit}>

    

    <label htmlFor="email">email:</label>
    <input type="email" id='email' name='email' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
    {formik.touched.email&&formik.errors.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:null}

    <label htmlFor="password">password:</label>
    <input type="password" id='password' name='password' className='w-100 form-control mb-3' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
    {formik.touched.password&&formik.errors.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:null}

    <Link to={'/forgetPassword'} className='forget cursor-pointer d-block mb-2' > Forget Your Password?</Link>
    

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
    :<button type="submit" disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white'>Login</button>}

  </form>

</div>

</div>
   
  </>
}
