import React,{useContext} from 'react';
import { Link } from "react-router-dom";
import {Container, Navbar, Nav,NavDropdown,Badge} from 'react-bootstrap';
import {RiShoppingBasketLine} from 'react-icons/ri'
import { Store } from '../Store'

const Menu = () => {

  const {state,state1, dispatch1} = useContext(Store)
  const {userInfo} = state1
  console.log(userInfo)

  let handlelogout =(e)=>{
    e.preventDefault()
    dispatch1({type:"USER_LOGOUT"})
    localStorage.removeItem("userinfo")
  }


  return (
    <div>
        <Navbar style={{background: "#16003B"}} variant="dark">
            <Container>
            <Navbar.Brand><img src="/assets/images/logo.png" /></Navbar.Brand>
            <Nav className="ms-auto menu">
                <Link to="/">Products</Link>
                <Link to="/cartpage">
                  <RiShoppingBasketLine/>
                  {state.cart.cartItems.length > 0 && (
                    <Badge pill bg="danger" >
                    {state.cart.cartItems.length}
                  </Badge>
                  )}
                </Link>
                {userInfo 
                ? 
                  <NavDropdown className="dropdownmenu" title={userInfo.name} id="nav-dropdown">
                    <NavDropdown.Item onClick={handlelogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                :
                  <Link to="/signin">Signin/Signup</Link>
                }
            </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default Menu