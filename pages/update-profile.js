import React, { useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStorage } from '@/context/StorageContext';


const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();
    const { currentUser, emailUpdate, passwordUpdate, updateUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);

    const { upload } = useStorage();

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            if (!file.type.includes("image")) {
                alert("File is not a valid image");
            }
            else {
                setPhoto(file);
            }
        }
    }

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (newPasswordRef.current.value !== newPasswordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        if (emailRef.current.value !== currentUser.email) {
            promises.push(emailUpdate(emailRef.current.value, passwordRef.current.value));
        }
        if (nameRef.current.value !== currentUser.displayName) {
            promises.push(updateUser(passwordRef.current.value, nameRef.current.value))
        }
        if (newPasswordRef.current.value) {
            promises.push(passwordUpdate(newPasswordRef.current.value, passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            router.push('/');
        })
            .catch((e) => {
                setError(e.message);
            }).finally(() => {
                setLoading(false);
            })

    };


    return (
        <React.Fragment>
            <section className='flex flex-col justify-center items-center min-h-screen auth-bg text-black p-8'>
                <div className="form-container w-[375px] relative border bg-white flex justify-center flex-col text-center rounded py-10">
                    <h2 className='text-[2.5em]'>Update Profile</h2>
                    <form onSubmit={handleSubmit} className='flex justify-evenly flex-col h-3/4 gap-4 p-[10px]'>
                        {error && <div className='error my-[10px] text-[1rem] p-[14px] bg-red-500 text-white outline-none border-none'>{error}</div>}
                        <div className='flex justify-center items-center flex-col gap-5 md:w-1/2'>
                            <div className='border border-black rounded-full w-[150px] h-[150px] flex justify-center items-center relative flex-col'>
                                {
                                    !photo ?
                                        (
                                            <svg className='pt-[20px]' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                                            </svg>
                                        ) :
                                        <div className='pt-[10px] flex justify-center flex-col items-center'>
                                            <svg className='w-[20px]' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                            </svg>
                                            <p>Picture uploaded</p>
                                        </div>
                                }
                                <input onChange={(e) => handleFileSelect(e)} className='cursor-pointer invisible' id="file-upload" type="file" />
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    <div className='w-[32px] absolute right-4 top-2 rounded-full border text-white border-white p-1 flex justify-center bg-black hover:bg-white hover:text-black cursor-pointer'>
                                        <svg className='w-[27px] right-5' fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
                                        </svg>
                                    </div>
                                </label>
                            </div>

                            <button onClick={() => setPhoto(null)} className={`${photo ? 'block' : 'hidden'} border-white border bg-red-500 p-2 rounded-md`}>
                                Remove
                            </button>

                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="email">Email</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='email' id='email' ref={emailRef} defaultValue={currentUser.email} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="name">Name</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='name' id='name' ref={nameRef} defaultValue={currentUser.displayName} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="password">Old Password</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='password' ref={passwordRef} required placeholder='Re-enter old password' />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="newPassword">New Password</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='newPassword' ref={newPasswordRef} placeholder='Leave blank to keep the same' />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="newPasswordConfirm">New Password Confirmation</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='newPasswordConfirm' ref={newPasswordConfirmRef} placeholder='Leave blank to keep the same' />
                        </div>
                        <button
                            disabled={loading}
                            type='submit'
                            className="my-[10px] p-[14px] bg-black text-white text-[1.2rem]"
                        >
                            Update
                        </button>

                    </form>
                    <Link href={'/'} className='absolute bottom-0 text-center w-full'>
                        Cancel
                    </Link>
                </div>
            </section>
        </React.Fragment>
    )
}

export default UpdateProfile