import { isAuthenticated } from '../../utils/auth'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/Login'
import { MyRecipesPage } from '../../pages/MyRecipes'
import React, { type JSX } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { SignUpPage } from '@/pages/SignUpPage'

interface RouteRecord {
    link: string,
    pageComponent: JSX.Element,
    authOnly?: boolean,
}

const loginRoute: RouteRecord = { link: '/login', pageComponent: <LoginPage /> }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to={loginRoute.link} replace />;
    }

    return children
}

const routes: RouteRecord[] = [
    loginRoute,
    { link: '/signup', pageComponent: <SignUpPage /> },
    { link: '/', pageComponent: <HomePage /> },
    { link: '/my-recipes', pageComponent: <MyRecipesPage /> },
    { link: '/profile', pageComponent: <MyRecipesPage />, authOnly: true },
]

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(r => (
                    <Route
                        key={r.link}
                        path={r.link}
                        element={
                            r.authOnly ? (
                                <ProtectedRoute>{r.pageComponent}</ProtectedRoute>
                            ) : (
                                r.pageComponent
                            )}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default AppRouter