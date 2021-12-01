import Swal from 'sweetalert2';

import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => { // dispatch lo llama el middleware thunk para tareas asincronas
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error');
            });
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => { // dispatch lo llama el middleware thunk para tareas asincronas
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await updateProfile(user, { displayName: name });
                console.log(user);

                dispatch(login(user.uid, user.displayName));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                Swal.fire('Error', errorCode + ' ' + errorMessage, 'error');
            });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}