import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        }
    }, [router.push, currentUser])

    return <>{currentUser ? children : null}</>
}

export default ProtectedRoute