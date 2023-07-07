import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, where } from "firebase/firestore";
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/clientApp';
import Link from 'next/link';
import PostList from '@/components/PostList';

const MyPosts = () => {
    const [userPosts, setUserPosts] = useState();

    const { currentUser } = useAuth();

    const getUserPosts = async () => {
        let stack = [];
        const q = query(collection(db, "posts"), where("user", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let newObj = Object.assign(doc.data(), { id: doc.id })
            stack.push(newObj);
        })

        setUserPosts(stack);
    }

    useEffect(() => {
        getUserPosts();
    }, [])

    return (
        <div className='flex justify-center items-center flex-col bg-white text-black py-4'>
            <h1 className='text-4xl my-4'>My Posts</h1>

            {userPosts ? <PostList posts={userPosts} /> : null}


            <Link href={'/posts'} className='px-6 py-3 bg-[#FFD363] text-black '>
                Create A Post
            </Link>
        </div>
    )
}

export default MyPosts