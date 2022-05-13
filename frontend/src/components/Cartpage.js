import React, { useContext } from 'react'
import { Container,Row,Col,ListGroup,Button, Alert } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Store } from '../Store'
import {BsFillTrashFill,BsFillHeartFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Cartpage = () => {

  const {state,dispatch} = useContext(Store)

  const {cart: {cartItems}} = state

  const upDateCart = (item,quantity)=>{
    dispatch({
      type: 'ADD_CART_ITEM',
      payload: {...item,quantity}
    })
  }
  const handleRemove =(item)=>{
    dispatch({
      type: 'REMOVE_CART_ITEM',
      payload: item
    })
  }
  return (
    <>
    <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
    <Container>
    <h1 style={{textAlign: 'center'}}>Shopping Cart</h1>
      <Row className='mt-5'>
        <Col lg={8}>
          {cartItems.length === 0 ?
          <Alert style={{background: '#001D6E',padding: '15px',borderRadius: '10px'}}>
          <h2 style={{fontSize: '35px',color: '#F32424', textAlign: 'center'}}>Opps!! Your Cart is empty</h2>
        </Alert>
        :
          <ListGroup>
          {cartItems.map((item)=>(
            <ListGroup.Item>
            <Row>
              <Col lg={2}>
                <img style={{width: '80px',height: '80px'}} src={item.img}/>
              </Col>
              <Col lg={3}>
                <Link to={`/products/${item.slug}`}>
                  <h5 style={{fontSize: '20px',textAlign: 'left',marginTop: '27px'}}>{item.name}</h5>
                </Link>
                </Col>
              <Col lg={3}>
              <div style={{marginTop: '22px'}}>
              <Button onClick={()=>upDateCart(item,item.quantity+1)} disabled={item.quantity == item.instock} variant="primary">+</Button>
              <span style={{margin: '0 5px'}}>{item.quantity}</span>
              <Button onClick={()=>upDateCart(item,item.quantity-1)} disabled={item.quantity === 1} variant="primary">-</Button>
              </div>
              </Col>
              <Col lg={2} style={{textAlign: 'center'}}>
                <BsFillTrashFill onClick={()=>handleRemove(item)} style={{fontSize: '30px',marginTop: '32px',color: '#001D6E',cursor: 'pointer'}}/>
              </Col>
              <Col lg={2}><BsFillHeartFill style={{fontSize: '30px',color: '#FF4949', marginTop: '32px'}}/></Col>
            </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
        }
        
        </Col>
        <Col lg={4}>
          
          <ListGroup>
            <ListGroup.Item>
              <h3 style={{color: '#FF4949'}}>Order details</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5 style={{display: 'flex',justifyContent: 'space-between'}}>Quantity <span>{cartItems.reduce((accumulator,current)=>accumulator + current.quantity, 0)}</span></h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5 style={{display: 'flex',justifyContent: 'space-between'}}>Price <span>${cartItems.reduce((accumulator,current)=> accumulator + current.price * current.quantity, 0)}</span></h5>
            </ListGroup.Item>
            <ListGroup.Item>
            <Button className='w-100' variant="primary"><h6>Check Out</h6></Button>
            </ListGroup.Item>
        </ListGroup>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Cartpage