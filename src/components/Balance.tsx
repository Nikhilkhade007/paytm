import axios from 'axios'
import React, { useEffect, useState } from 'react'
interface BalanceProps{
    token: string
}

function Balance({token}:BalanceProps) {
    const [balance ,setBalance] = useState(0)
    
    useEffect(()=>{
        axios({method:"get",url:"http://localhost:4000/api/accounts/balance",headers:{
            Authorization: token
        }}).then((e)=>{
            setBalance(e.data.balance)
        },[])
    },[])
  return (
    <div className='flex gap-3 text-center items-center'>
        <h3 className='font-bold text-lg'>Your Balance</h3>
        <div >{(Math.round(balance * 100) / 100).toFixed(2)}</div>
    </div>
  )
}

export default Balance