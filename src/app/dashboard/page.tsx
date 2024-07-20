'use client'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import Appbar from '@/components/Appbar'
import Balance from '@/components/Balance'
import Users from '@/components/Users'
import { Toaster } from '@/components/ui/toaster'
function Dashboard() {
  const [username,setusername] = useState("");
  const [id,setID] = useState("")
  useEffect(()=>{
    const {decode} = jwt
    const token = localStorage.getItem('token')
    const data = decode(token)
    const userData = data.rest._doc
    setusername(userData.username)
    setID(userData)
  },[])
  return (
    <div className='px-4 py-3 flex flex-col gap-4'>
      <Appbar user={username}/>
      <Balance token={localStorage.getItem('token') || ""}/>
      <Users data={id}/>
      <Toaster/>
    </div>
  )
}

export default Dashboard