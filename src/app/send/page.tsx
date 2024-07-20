'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { resolve } from 'path'

function Send() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const id = searchParams.get('to')
  const [amount,setAmount] = useState(0)
  const [loading ,setLoading] = useState(false)
  function sleep(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },1000)
    })
}
  async function sendMoney(){
    setLoading(true)
    try {
      const res =  await axios.post("http://localhost:4000/api/accounts/send",{
        to:id,
        amount:amount
      },{headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }})
      toast.success(res.data.message)
      await sleep()
      setLoading(false)
      router.push("/dashboard")
    } catch (e) {
      toast.error(e.data.message)
    }
    
  }
  return (
    <div className='w-full h-full flex justify-center items-center bg-slate-200'>
      <div className='flex shadow-md flex-col gap-14 p-8 rounded-xl bg-white w-[400px]'>
        <div className='text-center text-2xl font-bold'>Send Money</div>
        <div>
        <div className='flex flex-col gap-3'>
          <div className='flex gap-2 items-center'>
            <div className='bg-green-600 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center'><p>U</p></div>
            <div className='font-bold text-lg'>{username}</div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold'>Amount (in RS)</p>
            <Input value={amount} onChange={e=>setAmount(parseFloat(e.target.value))} placeholder='Enter amount' />
          </div>
          <Button disabled={loading} onClick={sendMoney} className='bg-green-600 text-white' >Initiate Transfer</Button>
        </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Send