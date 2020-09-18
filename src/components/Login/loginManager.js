import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, photoURL, email } = result.user;
            const singedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return singedInUser;
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            console.error(errorCode, errorMessage, email, credential);
        })
}

export const handleFBSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then(function (result) {
            var user = result.user;
            user.success = true;
            return user;
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(response => {
            const singedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                password: '',
                error: '',
                photo: '',
                success: false
            }
            return singedOutUser;
        }).catch(error => {
            // An error happened.
        });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
            const newUserInfo = response.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            verifyEmail();
            return newUserInfo;
        })
        .catch(error => {
            // Handle Errors here.
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            const newUserInfo = response.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            console.log(newUserInfo);
            return newUserInfo;
        })
        .catch(function (error) {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('Update successful')
    }).catch(function (error) {
        console.log(error)
    });
}

export const verifyEmail = () => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}

export const resetPassword = (email) => {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}