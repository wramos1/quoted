import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/firebase/clientApp';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }


    async function logOut() {
        setCurrentUser(null);
        await signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
            }
            else {
                setCurrentUser(null);
            }
            setLoading(false);
        })

        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
