import { Button } from '@mui/material'
import React from 'react';
import './Login.css';
import  {signInWithPopup}  from 'firebase/auth'
import { auth, provider } from '../../Firebase';

export const Login = () => {
    const handleLogin = async () => {
       await signInWithPopup(auth, provider).then((result)=>{
        console.log(result)
       })
       .catch((e)=>console.log(e))
    }
    return (
        <div className='container-login'>
            <div className="login-details">
                <img src='https://up.yimg.com/ib/th?id=OIP._S2IBeqibi4VqVnjfcx3dQHaE8&%3Bpid=Api&rs=1&c=1&qlt=95&w=150&h=100' alt='logo' />
                <Button className='btn-login' onClick={handleLogin}>Login</Button>
            </div>
        </div>
    )
}
