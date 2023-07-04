import React, { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '@/firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const StorageContext = createContext();

export const useStorage = () => useContext(StorageContext);

export function StorageProvider({ children }) {


    async function upload(file, currentUser) {
        const fileRef = ref(storage, '/profile-pics/' + currentUser.uuid + '.png');

        const snapShot = await uploadBytes(fileRef, file).then(() => {
            alert("Uploaded file");
        });
        const photoUrl = await getDownloadURL(fileRef);

        return photoUrl;
    }

    const value = {
        upload
    }
    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    )
}