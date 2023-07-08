import { useAuth } from '@/context/AuthContext'
import Link from 'next/link';
import React from 'react'

const Post = ({ post }) => {

    const { currentUser } = useAuth();


    return (
        <div className='post bg-black rounded-md min-h-[250px] h-[250px] min-w-[400px] w-[90%] lg:w-1/2 lg: basis-1/4 flex items-stretch border py-[20px] px-[5px] relative'>
            <div className='my-0 mx-[10px] w-1/2 flex justify-center items-center border border-[#CFAB4E]'>
                {post.authorPhoto ?
                    (
                        <img className='bg-[#CFAB4E] h-full' src={post.authorPhoto} alt="" />
                    )
                    : (
                        <svg className='pt-[20px] text-white w-[100px]' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                        </svg>
                    )
                }
            </div>
            <div className='w-1/2 flex flex-col justify-between text-white post-details'>
                <h2 className='text-[2em] author-name'>{post.author}</h2>
                <p className='text-[#FFD363] quote break-words p-2'>
                    "{post.quote}"
                </p>
                <span className='text-sm time align-end justify-end block'>{`Posted at ${post.timePosted}`}</span>
            </div>

            {post.user === currentUser.email ?
                (
                    <Link href={`/posts/${post.id}`} className='cursor-pointer absolute top-2 right-2 bg-blue-400 text-white py-1 px-2 rounded-md hover:brightness-75'>
                        Edit
                    </Link>
                ) : null}
        </div>
    )
}

export default Post