import React from 'react';
import styles from './Categories.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function Categories() {

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')  
  }

  let {isError , isLoading , data} = useQuery('getCategories' , getCategories);

  return <>

  <div className="row g-4 py-5">

    {data?.data.data?data?.data.data.map((category)=>

      <div key={category._id} className="col-md-4">

        <div className="card cursor-pointer product">

          <div className="card-img">
            <img className='w-100' height={300} src={category.image} alt="" />
          </div>

          <div className="card-text text-center py-3 ">
            <h3>{category.name}</h3>
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
