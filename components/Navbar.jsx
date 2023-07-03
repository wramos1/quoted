import { useAuth } from '@/context/AuthContext'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [userMiniNav, setUserMiniNav] = useState(false);

    const { logOut, name } = useAuth();
    const router = useRouter();

    const [headerClicked, setHeaderClicked] = useState(false);

    useEffect(() => {
        tabSelecting();
    }, []);

    const tabSelecting = () => {
        const tabs = document.getElementsByClassName('nav-link');
        if (window.innerWidth < 768) {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', () => {
                    closeSideNav();
                })
            };
        }
    }

    const closeSideNav = () => {
        document.querySelector('.main-nav').classList.remove('mobile', 'appear');
        setHeaderClicked(false)
    }

    const hamburgerClicked = () => {
        setHeaderClicked(!headerClicked)
        document.querySelector('.main-nav').classList.toggle('appear');
        document.querySelector('.main-nav').classList.toggle('mobile');
    }


    return (
        <nav className='z-[100] fixed text-black bg-white text-xl w-full flex items-center justify-between py-4 px-8 border-b-2 border-b-black'>
            <Link href={'/'} className='w-1/3'>
                <h1 className='logo text-5xl'>
                    "Quoted"
                </h1>
            </Link>

            <div className="main-nav w-1/3 flex items-center transition-all mobile:h-4/5 mobile:bg-white mobile:top-[87px] mobile:justify-center mobile:fixed mobile:-left-full mobile:flex mobile:flex-col mobile:w-full mobile:z-20 mobile:pt-5">
                <div className='w-full mobile:flex mobile:justify-center mobile:h-full mobile:text-center'>
                    <ul className='flex item-center justify-between flex-row mobile:flex-col mobile:justify-start mobile:gap-[20%]'>
                        <li className='hover:text-slate-400 nav-link'>
                            <Link href={'/menu'}>
                                Menu
                            </Link>
                        </li>

                        <li className='hover:text-slate-400 nav-link'>
                            <Link href={'/about-us'}>
                                About Us
                            </Link>
                        </li>

                        <li className='hover:text-slate-400 nav-link'>
                            <Link href={'/careers'}>
                                Careers
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='flex flex-row items-center gap-5'>
                <div className='relative'>
                    <h2 className='text-black flex flex-row items-center gap-2 logo text-2xl' onClick={() => setUserMiniNav(!userMiniNav)}>
                        {name}
                        <svg width="12" height="12" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Polygon 1" d="M3 3L0.401924 0.75L5.59808 0.75L3 3Z" fill="black" />
                        </svg>
                    </h2>

                    <div className={`${userMiniNav ? 'visible' : 'hidden'} absolute bg-white min-w-[120px] right-[-10px] text-right text-sm border-2`}>
                        <ul>
                            <Link href={'/update-profile'} className='border-b-2 flex items-center justify-end p-1 gap-2'>
                                Profile
                            </Link>
                            <li className='flex items-center justify-end p-1 gap-2' onClick={() => logOut()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                Log Out
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='hamburger hidden mobile:block' onClick={hamburgerClicked}>
                    <button className="relative group">
                        <div className={`relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-300 hover:ring-8 ring-opacity-30 duration-200 shadow-md ${headerClicked ? 'ring-4' : ''}`}>
                            <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-500 origin-center overflow-hidden ${headerClicked ? 'rotate-180' : ''}`}>
                                <div className={`bg-black h-[2px] w-7 transform transition-all duration-500 -translate-x-1 ${headerClicked ? '-rotate-45' : ''}`}></div>
                                <div className="bg-black h-[2px] w-7 rounded transform transition-all duration-500 "></div>
                                <div className={`bg-black h-[2px] w-7 transform transition-all duration-500 -translate-x-1 ${headerClicked ? 'rotate-45' : ''}`}></div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default Navbar