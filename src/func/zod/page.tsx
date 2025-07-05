import React from 'react'
import { z } from 'zod'

const page = () => {

    // creating a schema for strings
    // const mySchema = z.string();
    const emailSchema = z.string().email();
    console.log(emailSchema.safeParse("tunagmail.com"));

  return (
    <div>
        <div>zod page</div>
    </div>
  )
}

export default page