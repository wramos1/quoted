import React from 'react'
import Post from './Post'

const PostList = ({ posts, setPosts }) => {

    const handleOnSelect = () => {
        posts = posts.reverse();
        setPosts([...posts]);
    }

    return (
        <div className='flex flex-col px-3 w-full'>
            <div className='w-[140px] px-1 rounded-md bg-[#FFD363]'>
                <label htmlFor="sort-quotes" className='text-black'>Sort by: </label>
                <select className='bg-transparent outline-none text-black rounded-sm' name="sort-quotes" id="sort-quotes" defaultValue={"latest"} onChange={() => handleOnSelect()}>
                    <option value="latest" >
                        Latest
                    </option>

                    <option value="oldest">
                        Oldest
                    </option>
                </select>
            </div>


            <div className='auth-bg min-h-[400px] h-[500px] overflow-y-scroll rounded-md my-4 py-5 flex items-center flex-col gap-8 '>
                {posts.map((post) => {
                    return (
                        <Post
                            key={post.id}
                            post={post}
                        />
                    )
                })}
            </div>
        </div >
    )
}

export default PostList