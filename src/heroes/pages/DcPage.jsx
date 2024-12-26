import React from 'react'
import { HeroList } from '../components'

export const DcPage = () => {
  return (
    <>
      <h1>Dc Comics</h1>
      <hr />
      <div className='row'>
        <div className='col-12'>
          <HeroList publisher={'DC Comics'} />
        </div>
      </div>
    </>
  )
}
