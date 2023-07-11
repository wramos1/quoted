import React, { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '@/firebase/clientApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from '@/firebase/clientApp';
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { v4 } from 'uuid';

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
            const fileRef = ref(storage, '/author-pics/' + v4() + '.png');
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

    async function updatePost(data, docId, newPhoto) {
        const docRef = doc(db, "posts", docId);
        if (newPhoto) {
            const fileRef = ref(storage, '/author-pics/' + v4() + '.png');
            const snapShot = await uploadBytes(fileRef, newPhoto).then(() => {
                alert("Uploaded file");
            });
            data.authorPhoto = await getDownloadURL(fileRef);
        }

        return await updateDoc(docRef, data);
    }

    async function deletePost(docId) {
        const docRef = doc(db, "posts", docId);

        return await deleteDoc(docRef);
    }




    const value = {
        upload,
        uploadNewPost,
        updatePost,
        deletePost
    }

    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    )
}