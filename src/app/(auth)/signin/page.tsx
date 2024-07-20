'use client'
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button'
import UserInput from '@/components/UserInput';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


function SignIn() {
  const router = useRouter()
  const [formData,setFormData] = useState({})
  async function handleSubmit(e){
    e.preventDefault()
    console.log('Form submitted')
    try{
      const res = await axios({method:"get",url:"http://localhost:4000/api/users/signIn",params:formData})
      toast.success("Login successfully")
      router.push('/dashboard')
      console.log(res.data.token)
      localStorage.setItem('token', res.data.token)
        
    }catch(e){
      console.log(e)
      toast.error(e.response.data.message)
    }
    
  }
  function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <div className='h-full px-[50px] w-full bg-gray-400 flex items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col w-max-[350px]  bg-white gap-5 rounded-lg p-4'>
          <Heading title={"Sign Ip"} subHeading={"Enter your information to login into account"}/>
          <div className='flex flex-col gap-3'>
            <UserInput name='email' onChange={handleChange} label='Email' placeholder='Enter the email'/>
            <UserInput name='password' onChange={handleChange} type='password' label='Password' placeholder='Enter the password'/>
          </div>
          <Button>Sign Up</Button>
          <p className='text-sm text-center'>Don't have an account? <Link className='underline' href={"/signup"}>Sign Up</Link></p>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default SignIn
