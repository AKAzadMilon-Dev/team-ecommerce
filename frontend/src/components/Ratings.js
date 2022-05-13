import React from 'react'
import { BsStarFill,BsStarHalf,BsStar } from 'react-icons/bs';
import { Badge } from 'react-bootstrap';

const Ratings = ({proratings,num}) => {
  return (
    <div>
        
    {proratings >= 1 ? <BsStarFill className='staricon'/>:proratings >= .5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>} 
    {proratings >= 2 ? <BsStarFill className='staricon'/>:proratings >= 1.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
    {proratings >= 3 ? <BsStarFill className='staricon'/>:proratings >= 2.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
    {proratings >= 4 ? <BsStarFill className='staricon'/>:proratings >= 3.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
    {proratings >= 5 ? <BsStarFill className='staricon'/>:proratings >= 4.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}

    <h5>Total ratings <Badge bg="info">{num}</Badge></h5>
    </div>
  )
}

export default Ratings