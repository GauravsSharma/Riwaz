import React from 'react'

const AdminPageHeading = ({
    title,
    desciption
}:{
    title:string,
    desciption:string
}) => {
  return (
    <div>
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
            <p className="text-zinc-600">{desciption}</p>
        </div>
    </div>
  )
}

export default AdminPageHeading
