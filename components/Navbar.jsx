import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router';
import React from 'react'

const Navbar = () => {
    const { currentUser, logOut } = useAuth();
    const router = useRouter();


    return (
        <div>

        </div>
    )
}

export default Navbar