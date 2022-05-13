import React,{useReducer,useEffect, useContext} from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col,ListGroup,Card,Badge,Button } from 'react-bootstrap';
import axios from 'axios';
import Ratings from './Ratings';
import {GlassMagnifier} from 'react-image-magnifiers'
import {Helmet} from 'react-helmet-async'
import {Store} from '../Store'
import { useNavigate } from "react-router-dom";



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



const ProductDetails = (data) => {
    let params = useParams();
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
                const product = await axios.get(`/api/product/${params.slug}`)
                dispatch({type:'FETCH_SUCCESS', payload:product.data})
            }catch{
                dispatch({type:'FETCH_FAIL',payload:error.message})
            }
        }
        getData()
    },[params.slug])


    const {state,dispatch: ctxDispatch} = useContext(Store)
    const {cart} = state

    const handleAddToCart = async ()=>{
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
    }


  return (
    <div>
        <Helmet>
            <title>{product.name}</title>
        </Helmet>
        <Container>
            <Row className='mt-5'>
                <Col lg={6}>
                    {product.img 
                    && 
                    <GlassMagnifier  imageSrc={product.img}  imageAlt={product.name}  largeImageSrc={product.img} />}
                
                </Col>
                <Col lg={3}>
                <Card>
                    <Card.Header>
                        <h4 style={{color: '#FF4949'}}>{product.name}</h4>
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <Ratings proratings={product.rating} num={product.numberofratings}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Instock {' '}
                                {product.instock > 0 ?
                                <Badge bg="success">{product.instock}</Badge>:
                                <Badge bg="danger">{product.instock}</Badge>
                                }
                                </h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>${product.price}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
                <Col lg={3}>
                <Card>
                    <Card.Header>
                        <h4>Cart details</h4>
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h5 style={{display: 'flex',justifyContent: 'space-between'}}>Price <span>${product.price}</span></h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.cupon ? <input type="text" style={{width: '100%'}}/>:
                            <h6>No Cupon Available</h6>
                            }
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={handleAddToCart} style={{width: '100%'}}>Add To Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default ProductDetails