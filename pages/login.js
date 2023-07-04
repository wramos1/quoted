import React, { useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { logIn } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            router.push('/dashboard');
        } catch (e) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError(e.message)
        }

        setLoading(false);
    };


    return (
        <React.Fragment>
            <section className='flex flex-col justify-center items-center min-h-screen auth-bg text-black p-8'>
                <h1 className='text-[4em] mb-5 logo'>"Quoted"</h1>
                <div className="form-container w-[375px] relative border bg-white flex justify-center flex-col text-center rounded py-10">
                    <h2 className='text-[2.5em]'>Log In</h2>
                    <form onSubmit={handleSubmit} className='flex justify-evenly flex-col h-3/4 gap-4 p-[10px]'>
                        {error && <div className='error my-[10px] text-[1rem] p-[14px] bg-red-500 text-white outline-none border-none'>{error}</div>}
                        <div className='flex flex-col text-left'>
                            <label htmlFor="email">Email</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='email' id='email' ref={emailRef} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="password">Password</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='password' ref={passwordRef} />
                        </div>
                        <button
                            disabled={loading}
                            type='submit'
                            className="my-[10px] p-[14px] bg-black text-white text-[1.2rem]"
                        >
                            Log In
                        </button>

                        <Link href={'/forgot-password'} className='text-center text-zinc-500 hover:text-black'>
                            Forgot Password?
                        </Link>
                    </form>
                    <Link href={'/signup'} className='absolute bottom-0 text-center w-full text-zinc-500 hover:text-black'>
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </section>
        </React.Fragment>
    )
}

export default login