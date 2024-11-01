import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    signInWithRedirect, 
    GoogleAuthProvider } 
from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc } 
from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCjJskCJbATdKnC-yG70x7JVBwm5M2OOR4",
    authDomain: "crwn-clothing-db-a507e.firebaseapp.com",
    projectId: "crwn-clothing-db-a507e",
    storageBucket: "crwn-clothing-db-a507e.appspot.com",
    messagingSenderId: "444189529279",
    appId: "1:444189529279:web:c090b8947f08fde38ee20a"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    if (!userSnapshot.exists()) {
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
} 