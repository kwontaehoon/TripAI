import React from 'react'

const aiInput = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='modal'>
        <div className='border'>AI 추천 코스</div>
        <div className='border-b-1px'>필드 입력</div>

        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default aiInput