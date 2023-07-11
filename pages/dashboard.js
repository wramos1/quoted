import PostList from '@/components/PostList';
import { db } from '@/firebase/clientApp';
import { getDocs, getDoc, collection, orderBy, query } from "firebase/firestore";
import Link from 'next/link';

import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [posts, setPosts] = useState();

    const getPosts = async () => {
        let postList = [];
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let newObj = Object.assign(doc.data(), { id: doc.id })
            postList.push(newObj);
        });

        setPosts(postList);

    };

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className='flex items-center h-[120vh] flex-col gap-2 bg-white text-black py-4'>
            <h1 className='my-5 text-6xl'>
                Dashboard
            </h1>

            {posts && <PostList posts={posts} setPosts={setPosts} />}


            <Link href={'/posts'} className='px-6 py-3 bg-[#FFD363] text-black '>
                Create A Post
            </Link>


        </div>
    )
}

export default Dashboard