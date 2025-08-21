import React from 'react'
import { CreatePost } from './components/CreatePost'
import { PostCard } from './components/PostCard'

const page = () => {
  
  return (
    <div className='flex flex-row justify-between mt-8'>
      <div className="flex"></div>
      <CreatePost/>
      {/* <PostCard/> */}
      <div className="flex"></div>
    </div>
  )
}

export default page
