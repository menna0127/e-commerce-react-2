import React from 'react';

import error from '../../Assets/images/error.svg'

export default function NotFound() {

  return <>

    <div className="container">
        <img className='d-block m-auto' src={error} alt="error" />
    </div>

  </>
}
