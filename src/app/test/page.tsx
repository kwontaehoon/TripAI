
'use client'
import { useTestQuery } from '@/hooks/Test'
import { NextPage } from 'next'
import { useEffect } from 'react'

const Page: NextPage = () => {

    useEffect(()=>{
        const aa = () => {
            const response = useTestQuery();
            console.log('response: ', response);
        }
        aa();
    }, []);
    
  return <div>
    <div>test page</div>
  </div>
}

export default Page