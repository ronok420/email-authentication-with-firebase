import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email,setEmail]= useState('');
    const [error,setError] =useState('');
    const [success,setSuccess] =useState('');

    const auth =getAuth(app);


    const handleEmailchange = event =>{
        console.log(event.target.value);
        setEmail(event.target.value);
    }
    const handlePasswordBlur =event =>{
        console.log(event.target.value);
    }
    const handleSubmit =  event =>{
        event.preventDefault();
        setSuccess('');
        setError('');
        // console.log(event);
        const email=event.target.email.value;
        const password =event.target.password.value;
        const name =event.target.name.value;

        console.log('name:',name, email,'Password:',password);


        // validate
        if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('give two number at least');
            return;
        }


        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const loggedIn = result.user;
            console.log(loggedIn);
            setError('');
            event.target.reset();
            setSuccess('SignIn successful')
            // verifyEmail(loggedIn);
            sendEmailVerification(auth.currentUser)
            .then(
                alert('please verify the email')
            )

            updateProfileData(auth.currentUser,name);
        })
        .catch(error =>{
            console.error(error);
            setError(error.message);
            setSuccess('');
            
        })

        
    }
    const updateProfileData =(user,name)=>{
        updateProfile(user,{
            displayName:name

        })
        .then(() =>{
             console.log('user name updated');
        }
           

        )
        .catch(error=>{
            console.log(error);
            setError(error.message);
        }

        )

    }


    // const verifyEmail =user =>{
    //     sendEmailVerification(auth.user)
    //     .then(
    //         alert('please verify the email')
    //     )

    // }
    return (
        <div className='w-50 mx-auto'>
            <h2> this is the register page</h2>
            <form onSubmit={handleSubmit} action="">

               <input className='rounded mb-4' onChange={handleEmailchange} type="text" name="name" id="name" placeholder='enter your name' required/>
               <br />
               <input className='rounded mb-4' onChange={handleEmailchange} type="email" name="email" id="email" placeholder='enter your email' required/>
               <br />
               <input className='rounded mb-4' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='enter your password' required/>
               <br />
               <input className='rounded btn btn-danger' type="submit" value="register" />
            </form>
            <p><small>already registered  please <Link to="/login">login</Link></small></p>
            <h4 className='text-danger'>{error}</h4>
            <h4 className='text-success'>{success}</h4>
    
        </div>
    );
};

export default Register;