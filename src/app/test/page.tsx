'use client'
import { useTestQuery } from '@/hooks/Test'
import { NextPage } from 'next'

const Page: NextPage = () => {

  const { data, error, isLoading } = useTestQuery();

  return (
    <div>
      <div>test page</div>
      <div>Response Data: {JSON.stringify(data)}</div>
    </div>
  );
};

export default Page;