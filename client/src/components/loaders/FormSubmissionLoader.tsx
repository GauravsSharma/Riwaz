import Image from 'next/image'
import React from 'react'

const FormSubmissionLoader = () => {
  return (
   <Image src="/loaders/form_loader.gif" alt="" className="h-6 w-6" width={10} height={10}/>
  )
}

export default FormSubmissionLoader