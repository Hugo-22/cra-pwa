import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import './index.css';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const Form = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    initializeApp(firebaseConfig);

    const onSubmit = async () => {
        const auth = getAuth();
        try {
            const { user } = await signInWithEmailAndPassword(auth, username, password);
            window.localStorage.setItem('userToken', user.accessToken)
            navigate('/hack');
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div>
            <div className="form-login">
                <label htmlFor="username">Email</label>
                <input onChange={e => setUsername(e.target.value)} type="email" name="username" />
                <label htmlFor="password">Mot de passe</label>
                <input onChange={e => setPassword(e.target.value)} type="password" name="password" />
                <button onClick={onSubmit}>Se connecter</button>
            </div>
        </div>
    );
};

export default Form;