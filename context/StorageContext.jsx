import React, { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '@/firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from '@/firebase/clientApp';
import { collection, addDoc } from "firebase/firestore";

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

    async function uploadNewPost(author, quote, time, file, email, timeToCompare) {
        let photoUrl = '';
        if (file) {
            const fileRef = ref(storage, '/author-pics/' + '.png');
            const snapShot = await uploadBytes(fileRef, file).then(() => {
                alert("Uploaded file");
            });
            photoUrl = await getDownloadURL(fileRef);
        }

        const docRef = await addDoc(collection(db, "posts"), {
            author: author,
            authorPhoto: photoUrl === '' ? null : photoUrl,
            quote: quote,
            timePosted: time,
            user: email,
            timestamp: timeToCompare
        })

        return docRef;

    }




    const value = {
        upload,
        uploadNewPost
    }
    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    )
}