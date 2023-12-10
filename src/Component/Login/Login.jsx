import { getAuth, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';


const Login = () => {
    const auth = getAuth(app);
    const [error,setError] =useState('');
    const [success,setSuccess] =useState('');
    const emailREf =useRef();


    const handleSubmit=event=>{
        event.preventDefault();
        const form =event.target;
        const email=form.email.value;
        const password=form.password.value;
        setError('');
        setSuccess('');

       
        // validation   (?=.*[A-Z].*[A-Z])     (?=.*[!@#$&*])
        //this part is basically for validation but in login for don't need validation
        // if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        //     setError('give at lest two charecter');
        //     return;

        // }
        console.log(email,password);
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const loginUser =result.user;
            if(!loginUser.emailVerified){
                alert('please verify email first')
                return;
            }
            console.log(loginUser);
            setSuccess('login successful');

        })
        .catch(error=>{
            console.error(error);
            setError(error.message);
            setSuccess('');
        })

    }
    const handleResetPasword=e=>{
        const email=emailREf.current.value;
        if(!email){
            alert('please enter email first to reset');
            return;
        }
        console.log(emailREf.current.value);
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('please check your email')
        })
        .catch(error=>{
            console.log(error);
            setError(error.message);
        })
    }
    return (
        <div className="w-50 mx-auto mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" ref={emailREf} placeholder="Enter email" required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required/>
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className="mb-3">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p><small>forget password? <button onClick={handleResetPasword}  btn btn-link>reset it</button></small></p>
            <p><small>don't have any account please <Link to="/register">register</Link></small></p>
            <h4 className='text-danger'>{error}</h4>
            <h4 className='text-success'>{success}</h4>
        </div>
    );
};

export default Login;