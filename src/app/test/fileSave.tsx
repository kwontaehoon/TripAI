import React, { useState } from 'react'

const fileSave = () => {

    const [file, setFile] = useState(null);
    console.log("file: ", file);
    const [message, setMessage] = useState("");
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
    //   for(let i of [file]){
    //     formData.append("files", i);
    // }
    // formData.append("title", "title test");
    // formData.append("content", "content test");
  
      try {
        const res = await fetch('http://localhost:8080/test/image/add', {
          method: 'POST',
          headers: {
            "x-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Credentials": true,
            // 'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          },
          body: formData
        });
        const data = await res.json();
        if (data.message === '파일 업로드 성공') {
          setMessage("파일 업로드 완료");
        }
      } catch (error) {
        setMessage("업로드 실패");
      }
    };
  
    const uploadSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const res = await fetch('http://localhost:8080/binary/upload', {
          method: 'POST',
          headers: {
            "x-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Credentials": true,
            // 'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          },
          body: formData
        });
        const data = await res.json();
        if (data.message === '파일 업로드 성공') {
          setMessage("파일 업로드 완료");
        }
      } catch (error) {
        setMessage("업로드 실패");
      }
    };

  return (
    <div>
        <div className='w-20 h-20'>
          <img src='https://tong-bucket.s3.ap-northeast-2.amazonaws.com/0ef1eaf5-5faf-444b-8ee6-2dfca8d4a82c-KakaoTalk_20240314_190006132.jpg' />
        </div>
        <div className='w-20 h-20 border'>
          <img src="http://localhost:8080/images?filename=3x4%201.jpg" />
        </div>
        <form onSubmit={uploadSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">파일 업로드</button>
      </form>
    </div>
  )
}

export default fileSave