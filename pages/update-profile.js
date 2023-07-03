import React, { useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';


const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();
    const { currentUser, emailUpdate, passwordUpdate, updateUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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