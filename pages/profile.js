import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Profile = () => {

    const { currentUser, logOut, name, photo } = useAuth();

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-10">
            <div className='flex justify-center items-center flex-col gap-5 md:w-1/2'>
                <div className='border border-white rounded-full w-[150px] h-[150px] flex justify-center items-center relative flex-col'>
                    {(!photo || photo === '') ?
                        (
                            <svg className='pt-[20px]' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                            </svg>

                        ) :
                        <img className='w-[90px]' src={currentUser.photoUrl} alt="profilePic" />
                    }
                    <Link href={"/update-profile"}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <div className='w-[32px] absolute right-4 top-2 rounded-full border border-white p-1 flex justify-center bg-black hover:bg-white hover:text-black cursor-pointer'>
                                <svg className='w-[27px] right-5' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
                                </svg>
                            </div>
                        </label>
                    </Link>
                </div>

                <div className='w-full flex flex-col text-left'>
                    <label>Name</label>
                    <input className='text-black focus:outline-none py-2 px-1 bg-zinc-300' readOnly type="text" defaultValue={name ? name : currentUser.displayName} />
                </div>

                <div className='w-full flex flex-col text-left'>
                    <label>Email</label>
                    <input className='text-black focus:outline-none py-2 px-1 bg-zinc-300' readOnly type="text" defaultValue={currentUser.email} />
                </div>

                <div className='w-full flex gap-10 justify-center items-center'>
                    <Link href={'/update-profile'} className='text-center border p-3 rounded-md w-[135px] hover:bg-zinc-300/40'>
                        Update Profile
                    </Link>
                    <button onClick={() => logOut()} className='text-center border p-3 rounded-md w-[135px] hover:bg-zinc-300/40'>
                        Log Out
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Profile