import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { AuthRouter } from "./AuthRouter";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const auth = getAuth();

        onAuthStateChanged(auth, async (user) => {

            if (user?.uid) {

                dispatch(login(user.uid, user.displayName));

                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));

            } else {

                setIsLoggedIn(false);

            }

            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element=
                    {
                        <PrivateRoute isAuthenticated={isLoggedIn} >
                            <JournalScreen />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/*"
                    element=
                    {
                        <Navigate replace to="auth/login" />
                    }
                />

                <Route
                    path="auth/*"
                    element=
                    {
                        <PublicRoute isAuthenticated={isLoggedIn} >
                            <AuthRouter />
                        </PublicRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    )
}
