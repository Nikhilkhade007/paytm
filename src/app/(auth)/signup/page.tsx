'use client'
import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import UserInput from '@/components/UserInput'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import {useRouter } from "next/navigation"

function SignUp() {
  const router = useRouter()
  const [formData,setFormData] = useState({})
  async function handleSubmit(e){
    e.preventDefault()
    console.log('Form submitted')
    try{
      const res = await axios.post("http://localhost:4000/api/users/signUp",formData,{headers: {
        "Content-Type": "application/json"}})
        toast.success("Account created successfully")
        router.push('/signin')
    }catch(e){
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
          <Heading title={"Sign Up"} subHeading={"Enter your information to create an account"}/>
          <div className='flex flex-col gap-3'>
            <UserInput name="username" onChange={handleChange} label='Username' placeholder='Enter the username'/>
            <UserInput name='email' onChange={handleChange} label='Email' placeholder='Enter the email'/>
            <UserInput name='password' onChange={handleChange} type='password' label='Password' placeholder='Enter the password'/>
          </div>
          <Button>Sign Up</Button>
          <p className='text-sm text-center'>Already have an account? <Link className='underline' href={"/signin"}>Login</Link></p>
        </div>
      </form>
      <Toaster />
    </div>
  )
}

export default SignUp