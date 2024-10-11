import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import  { useState } from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../types/api-types';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [gender, setgender] = useState("");
  const [date, setdate] = useState("");

  const [login]=useLoginMutation()

  const loginHandler= async ()=>{
     try{
      const provider =new GoogleAuthProvider();
      const {user} = await signInWithPopup(auth,provider);
      
      
      const res=await login({
        name:user.displayName!,
        email:user.email!,
        photo:user.photoURL!,
        gender,
        role:"user",
        dob:date,
        _id:user.uid
      })

      if("data" in res ){
        toast.success(res!.data!.message);
        return <Navigate to={"/home"}/>
        
      }else{
        const error =res.error as FetchBaseQueryError;
        const message=(error.data as MessageResponse).message
        toast.error(message)
        return <Navigate to={"/home"}/>
      }

      
     }catch(error){
      toast.error("Sign In Failed")
      
     }

  }

  return (
   <div className="login">
    <main>
      <h1 className='heading'>Login</h1>
      <div>
        <label>Gender</label>
        <select value={gender} onChange={(e)=>setgender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option  value="female">Female</option>
        </select>

      </div>
      <div>
        <label>Gender</label>
        <input type="date" value={date} onChange={(e)=>setdate(e.target.value)}></input>
      </div>
      <div>
        
        <button onClick={loginHandler}>
          <FcGoogle/> <span>Sign in with Google</span>
        </button>
        <p>Your account is Secured !</p>
      </div>

    </main>
   </div>

  )
}

export default Login