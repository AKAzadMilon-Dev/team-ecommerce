import axios from 'axios';
import React, { useState } from 'react'
import {Container,Form,Row,Col,Button} from 'react-bootstrap';
import { Link,useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async'

export default function Signup() {
    let navigate = useNavigate();
    
    let [input,setInput] = useState({
        name :"",
        email :"",
        password :"",
        confirmpassword :""
    })

    let handleinpute =(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    let handlesubmit = async (e)=>{
        e.preventDefault()
        const {name,email,password,confirmpassword} = input
        try{
            const {data} = await axios.post("/api/auth/register",{
                name,
                email,
                password,
                confirmpassword
            })
            navigate('/signin',{signupstate:"Account create successful.Please login"});
        }catch(err){
            alert(err.response.data.meg)
        }
    }

  return (
    <>
    <Helmet>
        <title>signup</title>
    </Helmet>
    <Container>
        <Row className='signin'>
            <Col xs={4} md={4}>
            <h1>Signup Page</h1>
                <Form onSubmit={handlesubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" onChange={handleinpute}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" onChange={handleinpute}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" onChange={handleinpute}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirme Password</Form.Label>
                        <Form.Control name="confirmpassword" type="password" onChange={handleinpute}/>
                    </Form.Group>
                    <Button type='submit' variant="primary">Submit</Button>
                </Form>
                <span>Already have an account ? <Link to="/signin"> LogIn</Link></span>
            </Col>
        </Row>
    </Container>
    </>
  )
}
