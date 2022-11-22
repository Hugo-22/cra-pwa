import {useEffect, useState} from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { pwa } from "pwafire";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const Hack = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        console.log(window.localStorage.getItem('userToken'));
    });

    const getContacts = async () => {
        const supported = 'contacts' in navigator;
        if (!supported) {
            console.error('contacts api not supported');
            return;
        }
        const props = ["name", "email", "tel"];
        const options = { multiple: true };
        const { contacts } = await pwa.Contacts(props, options);

        try {
            const docRef = await addDoc(collection(db, "cra-pwa-contacts"), contacts);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div>
            <button onClick={getContacts}>HACK</button>
        </div>
    )
};

export default Hack;