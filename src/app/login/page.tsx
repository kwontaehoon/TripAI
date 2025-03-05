'use client'
import { useState } from 'react'

const page = () => {
    type loginType = {
        email: string,
        password: string
    }

    const [loginState, setLoginState] = useState<loginType>({
        email: "",
        password: ""
    })

    const [loginMessage, setLoginMessage] = useState<boolean>(false)

    console.log(loginState)

    const onSubmit = () => {
        if(!!loginState.email && !!loginState.password){
            setLoginMessage(true)
        }else {
            setLoginMessage(false)
        }
    }
  return (
    <div role='first-div' className='py-28'>
        <div className='font-bold text-3xl mb-5'>로그인</div>
        <form role='form' onSubmit={onSubmit}>
            <label role='first-label' id="email-label" className='flex'>
                <div>이메일</div>
                <input className='border' onChange={(e) => setLoginState({...loginState, email: e.target.value})} placeholder='이메일'></input>
            </label>
            <label role='second-label' id="password-label" className='flex'>
                <div>비밀번호</div>
                <input className='border' onChange={(e) => setLoginState({...loginState, password: e.target.value})} placeholder='비밀번호'></input>
            </label>
            <button type='submit' id='id-submit'>로그인</button>
        </form>
        {!loginMessage && <div>다시 입력해 주세요.</div>}
    </div>
  )
}

export default page