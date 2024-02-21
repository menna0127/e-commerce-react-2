import React from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';


export default function Brands() {

  function getBrands() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/brands')  
  }

  let {isError , isLoading , data} = useQuery('getBrands' , getBrands);

  console.log(data?.data.data);


  return <>

  <div className="brand-title my-5 ">
    <h2 className='text-center text-main fw-bolder'>All Brands</h2>
  </div>

  <div className="row g-4 py-5">

    {data?.data.data? data.data.data.map((brand) => 

    <div className="col-md-3">

      <div className="card product cursor-pointer">

        <div className="card-img">
          <img className='w-100' height={220} src={brand.image} alt="img" />
        </div>

        <div className="card-text">
          <h3 className=' text-center font-sm text-black'>{brand.name}</h3>
        </div>

      </div>

    </div>

    ):

    <div className="back-g d-flex justify-content-center align-items-center 100vh">

       <ColorRing
         visible={true}
         height="80"
         width="80"
         ariaLabel="blocks-loading"
         wrapperStyle={{}}
         wrapperClass="blocks-wrapper"
         colors={['#0aad0a', '#0aad0a', '#0aad0a', '#0aad0a', '#0aad0a']}
       />

    </div>
    }

  </div>
    
  </>
}
