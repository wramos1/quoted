import React, { useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const ForgotPassword = () => {

    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);



    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
            emailRef.current.value = '';
        } catch (e) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError(e.message);
        }

        setLoading(false);
    };


    return (
        <React.Fragment>
            <section className='flex flex-col justify-center items-center min-h-screen auth-bg text-black p-8'>
                <h1 className='text-[4em] mb-5 logo'>"Quoted"</h1>
                <div className="form-container w-[375px] relative border bg-white flex justify-center flex-col text-center rounded py-10">
                    <h2 className='text-[2.5em]'>Password Reset</h2>
                    <form onSubmit={handleSubmit} className='flex justify-evenly flex-col h-3/4 gap-4 p-[10px]'>
                        {error && <div className='error my-[10px] text-[1rem] p-[14px] bg-red-500 text-white outline-none border-none'>{error}</div>}
                        {message && <div className='message my-[10px] text-[1rem] p-[14px] bg-green-500 text-white outline-none border-none'>{message}</div>}
                        <div className='flex flex-col text-left'>
                            <label htmlFor="email">Email</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='email' id='email' ref={emailRef} />
                        </div>
                        <button
                            disabled={loading}
                            type='submit'
                            className="my-[10px] p-[14px] bg-black text-white text-[1.2rem]"
                        >
                            Reset Password
                        </button>
                    </form>
                    <Link href={'/login'} className='absolute bottom-0 text-center w-full text-zinc-500 hover:text-black'>
                        Log In
                    </Link>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ForgotPassword