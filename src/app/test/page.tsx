'use client'
import { useTestQuery } from '@/hooks/dev'
import { NextPage } from 'next'
import FileUpload from './fileSave'

const Page: NextPage = () => {

  const { data, error, isLoading } = useTestQuery();

  return (
    <div>
      <div>test page</div>
      <div>Response Data: {JSON.stringify(data)}</div>
      <FileUpload />
    </div>
  );
};

export default Page;