import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/firebase/clientApp';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [name, setName] = useState();
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(true);

    async function signUp(email, password, name) {
        const res = await createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
            updateProfile(userCred.user, { displayName: name });
            setName(name);
        })

        return res;
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    async function updateUser(password, name, photo) {
        const res = await signInWithEmailAndPassword(auth, currentUser.email, password).then((userCred) => {
            updateProfile(userCred.user, { displayName: name, photoURL: photo })
            setName(name);
            setPhoto(photo);
        })

        return res;
    }

    async function emailUpdate(email, password) {
        const res = await signInWithEmailAndPassword(auth, currentUser.email, password).then((userCred) => {
            updateEmail(userCred.user, email);
        })

        return res;
    }

    async function passwordUpdate(newPassword, password) {
        const res = await signInWithEmailAndPassword(auth, currentUser.email, password).then((user) => {
            updatePassword(user.user, newPassword);
        })

        return res;
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
                    displayName: user.displayName,
                    photoUrl: user.photoURL
                })
                setName(user.displayName);
                setPhoto(user.photoURL);

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
        name,
        logIn,
        logOut,
        resetPassword,
        emailUpdate,
        passwordUpdate,
        updateUser
    }
    return (
        <AuthContext.Provider value={value}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
