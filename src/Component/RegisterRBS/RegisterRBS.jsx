import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';


const RegisterRBS = () => {
    const auth =getAuth(app);

    const handleSubmit= e =>{
        e.preventDefault();
        const email =e.target.email.value;
        const pass = e.target.password.value;
        console.log(email,pass);
        createUserWithEmailAndPassword(auth,email,pass)
        .then(result=>{
            const loggedIn = result.user;
            console.log(loggedIn);
        })
        .catch(error =>{
            console.error(error);
        })
    }
    return (
        <div className='w-100 mx-auto'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required/>
                   
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="terms and conditions" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    );
};

export default RegisterRBS;