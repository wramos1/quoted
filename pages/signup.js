import React, { useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Signup = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        console.log(image);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            console.log(nameRef.current.value)
            await signUp(emailRef.current.value, passwordRef.current.value, nameRef.current.value, null);
            router.push('/dashboard');
        } catch (e) {
            setError(e.message)
        }

        setLoading(false);
    }

    return (
        <React.Fragment>
            <section className='flex flex-col justify-center items-center min-h-screen auth-bg text-black p-8'>
                <h1 className='text-[4em] mb-5 logo'>"Quoted"</h1>
                <div className="form-container w-[375px] relative border bg-white flex justify-center flex-col text-center rounded py-10">
                    <h2 className='text-[2.5em]'>Sign Up</h2>
                    <form onSubmit={handleSubmit} className='flex justify-evenly flex-col h-3/4 gap-4 p-[10px]'>
                        {error && <div className='error my-[10px] text-[1rem] p-[14px] bg-red-500 text-white outline-none border-none'>{error}</div>}
                        <div className='flex flex-col text-left'>
                            <label htmlFor="pfp">Profile Picture</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='file' id='pfp' onChange={handleImageAsFile} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="email">Email</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='email' id='email' required ref={emailRef} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="name">Name</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='name' id='name' required ref={nameRef} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="password">Password</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='password' required ref={passwordRef} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="passwordConfirm">Password Confirmation</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='passwordConfirm' required ref={passwordConfirmRef} />
                        </div>
                        <button
                            disabled={loading}
                            type='submit'
                            className="my-[10px] p-[14px] bg-black text-white text-[1.2rem]"
                        >
                            Sign Up
                        </button>
                    </form>
                    <Link href={'/login'} className='absolute bottom-0 text-center w-full'>
                        Already have an account? Log In
                    </Link>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Signup
