import React, { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '@/firebase/clientApp';
import { ref, uploadBytes } from 'firebase/storage'
import { useAuth } from './AuthContext';

const StorageContext = createContext();

export const useStorage = () => useContext(StorageContext);

export function StorageProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    async function upload(file) {
        const fileRef = ref(storage, currentUser.uuid + '.png');
        setLoading(true);
        const snapShot = await uploadBytes(fileRef, file)

        setLoading(false);
        return snapShot;
    }

    useEffect(() => {
        setLoading(false);
    }, [])

    const value = {
        upload
    }
    return (
        <StorageContext.Provider value={value}>
            {loading ? null : children}
        </StorageContext.Provider>
    )
}