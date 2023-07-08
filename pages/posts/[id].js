import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from '@/firebase/clientApp';
import Post from '@/components/Post';

const IndividualPost = () => {
    const [post, setPost] = useState()
    const router = useRouter();

    const getPost = async () => {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === router.query.id) {
                setPost(doc.data());
            }
        })
    };


    useEffect(() => {
        getPost();
    }, [])

    return (
        <>
            {post && <Post post={post} />}
        </>
    )
}

export default IndividualPost