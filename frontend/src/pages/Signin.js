import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Container,Form,Row,Col,Button} from 'react-bootstrap';
import { Link,useLocation,useNavigate } from "react-router-dom";
import {Store} from '../Store';
import { Helmet } from 'react-helmet-async'

export default function Signin() {
    let navigate = useNavigate();
    let {search,signupstate} = useLocation();
    if(signupstate){
        alert(signupstate)
    }

    let [input,setInput] = useState({
        email :"",
        password :""
    })

    let handleinpute =(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const {state1, dispatch1} = useContext(Store)
    const {userInfo} = state1

    let handlesubmit = async (e)=>{
        e.preventDefault()
        const {email,password} = input
        try{
            const {data} = await axios.post("/api/auth/login",{
                email,
                password
            })
            dispatch1({ type:"USER_SIGNIN",payload:data })
            localStorage.setItem('userinfo',JSON.stringify(data))
            navigate('/');
        }catch(err){
            alert(err.response.data.meg)
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[])
  return (
    <>
    <Helmet>
        <title>signin</title>
    </Helmet>
    <Container>
        <Row className='signin'>
            <Col xs={4} md={4}>
            <h1>Signin Page</h1>
                <Form onSubmit={handlesubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" onChange={handleinpute}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" onChange={handleinpute}/>
                    </Form.Group>
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
                    <span>Don not have an account? <Link to="/signup"> Create Account</Link></span>
            </Col>
        </Row>
    </Container>
    </>
  )
}
