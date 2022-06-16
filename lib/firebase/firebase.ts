import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const appConfig = {
	apiKey: 'AIzaSyBeXGU28GjBDK17PE4lYjQ7GIMUJ8qh5I0',
	authDomain: 'netlfix-clone-v1.firebaseapp.com',
	projectId: 'netlfix-clone-v1',
	storageBucket: 'netlfix-clone-v1.appspot.com',
	messagingSenderId: '820737027027',
	appId: '1:820737027027:web:f90e6c2ab6fb3092819d26',
};

export const app = getApps().length ? getApp() : initializeApp(appConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);
