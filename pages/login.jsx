import React, { useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';


const Signup = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();



    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            router.push('/dashboard');
        } catch (e) {
            setError(e.message)
        }

        setLoading(false);
    }

    return (
        <React.Fragment>
            <section className='flex flex-col justify-center items-center min-h-screen auth-bg text-black p-8'>
                <h1 className='text-[3em] mb-5'>"Quoted"</h1>
                <div className="form-container w-[375px] relative min-h-[550px] border bg-white flex justify-center flex-col text-center rounded">
                    <h2 className='text-[2.5em]'>Sign Up</h2>
                    <form onSubmit={handleSubmit} className='flex justify-evenly flex-col h-3/4 gap-2 p-[10px]'>
                        {error && <div className='error my-[10px] text-[1rem] p-[14px] bg-red-500 text-white outline-none border-none'>{error}</div>}
                        <div className='flex flex-col text-left'>
                            <label htmlFor="email">Email</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='email' id='email' ref={emailRef} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="password">Password</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='password' ref={passwordRef} />
                        </div>
                        <div className='flex flex-col text-left'>
                            <label htmlFor="passwordConfirm">Password Confirmation</label>
                            <input className='text-black py-[10px] px-[5px] text-[1.1em] bg-zinc-300 rounded' type='password' id='passwordConfirm' ref={passwordConfirmRef} />
                        </div>
                        <button
                            disabled={loading}
                            type='submit'
                            className="my-[10px] p-[14px] bg-black text-white text-[1.2rem]"
                        >
                            Sign Up
                        </button>
                    </form>
                    <h3 className='absolute bottom-0 text-center w-full'>
                        Already have an account? Log In
                    </h3>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Signup
