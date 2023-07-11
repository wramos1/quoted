import { useAuth } from '@/context/AuthContext'
import { useStorage } from '@/context/StorageContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Post = ({ post }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [openPostOptions, setOpenPostOptions] = useState(false);

    const { currentUser } = useAuth();

    const { deletePost } = useStorage();

    const handleDelete = async (id) => {

        try {
            setLoading(true);
            await deletePost(id)
            router.push('/');
        } catch (e) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            alert(e.message)
        }

        setLoading(false);
    }


    return (
        <div className='post bg-black rounded-md min-h-[250px] h-[250px] min-w-[400px] w-[98%] lg:w-3/5 lg:basis-1/4  flex items-stretch border py-[20px] px-[5px] relative'>
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
                <p className='text-[#FFD363] quote break-words p-2 max-h-[280px] overflow-y-auto'>
                    "{post.quote}"
                </p>
                <span className='text-sm time align-end justify-end block'>{`Posted at ${post.timePosted}`}</span>
            </div>

            {post.user === currentUser.email ?
                (
                    <React.Fragment>
                        <div onClick={() => setOpenPostOptions(!openPostOptions)} className='text-white flex flex-col absolute top-0 right-2 cursor-pointer w-[35px] items-end px-3'>
                            <h2 className='h-[8px]'>.</h2>
                            <h2 className='h-[8px]'>.</h2>
                            <h2 className='h-[8px]'>.</h2>
                        </div>
                        <div className={`${openPostOptions ? 'visible' : 'hidden'} absolute top-[45px] right-[10px] bg-zinc-600 w-[100px] h-[90px] p-2 flex flex-col justify-end items-end gap-2 rounded-md`}>
                            <Link href={`/posts/${post.id}`} className='cursor-pointer bg-blue-400 text-white py-1 px-4 rounded-md hover:brightness-75 w-[80px] text-center'>
                                Edit
                            </Link>
                            <div onClick={() => handleDelete(post.id)} className='cursor-pointer bg-red-400 text-white py-1 px-4 rounded-md hover:brightness-75 w-[80px] text-center'>
                                Delete
                            </div>
                        </div>
                    </React.Fragment>
                ) : null}
        </div>
    )
}

export default Post