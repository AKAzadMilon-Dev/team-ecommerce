import React, { useEffect, useContext, useReducer } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner,Badge } from 'react-bootstrap';
import axios from 'axios';
import { BsStarFill,BsStarHalf,BsStar } from 'react-icons/bs';
import {Store} from '../Store'

function reducer(state, action) {
    switch (action.type) {
      case 'FECTH_REQUEST':
        return {...state,loading:true};
      case 'FETCH_SUCCESS':
        return {...state,loading:false,product:action.payload};
      case 'FETCH_FAIL':
        return {...state,loading:false,error:action.payload};
      default:
        return state
    }
}

const ProductPage = () => {

    let navigate = useNavigate();
    const [{loading, product, error}, dispatch] = useReducer(reducer,{
        loading:false,
        product:[],
        error:""
    });

    useEffect( ()=>{
        const getData = async()=>{
            dispatch({type:'FECTH_REQUEST'})
            try{
                const product = await axios.get("/api/product")
                dispatch({type:'FETCH_SUCCESS', payload:product.data})
            }catch{
                dispatch({type:'FETCH_FAIL',payload:error.message})
            }
        }
        getData()
    },[])


    const {state1, dispatch1,state,dispatch: ctxDispatch} = useContext(Store)
    const {cart} = state
    const {userInfo} = state1
    console.log(userInfo)
    const handleAddToCart = async (product)=>{
        if(userInfo){
            const existingItem = cart.cartItems.find((item)=> item._id === product._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1
        const {data} = await axios.get(`/cartproducts/${product._id}`)

        if(data.instock < quantity){
            window.alert(`${product.name} Out Of Stock`)
            return
        }
        ctxDispatch({
            type: 'ADD_CART_ITEM',
            payload: {...product,quantity}
        })
        navigate(`/cartpage`);
        }else{
            navigate(`/signin`);
        }
    }
  return (
    <div>
        <Container style={{marginTop:"30px"}}>
            <Row>
                {
                    loading?
                    <div className='loading'>
                        <Spinner animation="grow" variant="warning" />
                    </div>
                    :
                    product.map(item=>(
                        <Col lg={3} style={{marginBottom:"20px"}}>
                            <Card >
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Title>
                                        <Link className='productname' to={`/products/${item.slug}`}>{item.name}</Link>
                                        
                                    </Card.Title>
                                    <div className='ratingIcon'>
                                        {item.rating >= 1 ? <BsStarFill className='staricon'/>:item.rating >= .5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
                                        {item.rating >= 2 ? <BsStarFill className='staricon'/>:item.rating >= 1.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
                                        {item.rating >= 3 ? <BsStarFill className='staricon'/>:item.rating >= 2.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
                                        {item.rating >= 4 ? <BsStarFill className='staricon'/>:item.rating >= 3.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
                                        {item.rating >= 5 ? <BsStarFill className='staricon'/>:item.rating >= 4.5 ? <BsStarHalf className='staricon'/>:<BsStar className='staricon'/>}
                                    </div>
                                    <Card.Text>
                                        <h6>Total Ratings  <Badge variant='danger'>{item.numberofratings}</Badge></h6>
                                    </Card.Text>
                                    <Card.Text>
                                        <h6>File in stock  <Badge variant='warning'>{item.instock}</Badge></h6>
                                    </Card.Text>
                                    <Card.Text>
                                        <h5>Price $ {item.price}</h5>
                                    </Card.Text>
                                    <Card.Text>{item.description.substring(0, 53)}.....</Card.Text>
                                    
                                    <Button onClick={()=>handleAddToCart(item)} variant="primary" style={{width: '100%'}}>Add To Card</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </div>
  )
}

export default ProductPage