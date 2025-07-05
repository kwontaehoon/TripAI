'use client'
import { useTestQuery } from '@/hooks/springboot/dev'
import { NextPage } from 'next'
import FileUpload from './fileSave'

const Page: NextPage = () => {

  const { data } = useTestQuery();

  return (
    <div>
      <div>test page</div>
      <div>Response Data: {JSON.stringify(data)}</div>
      <FileUpload />
    </div>
  );
};

export default Page;