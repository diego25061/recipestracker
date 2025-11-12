import React, { type JSX } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/context/AuthContext'
import { AppLayout } from '../layout/AppLayout'
import { SiteLoginRoute, SiteRoutes } from './Routes'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuthStore()
    return isAuthenticated ? children : <Navigate to={SiteLoginRoute.link} replace />
}

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {SiteRoutes.map(r => {
                    const Comp = r.omitLayout === true ? r.pageComponent : <AppLayout>{r.pageComponent}</AppLayout>
                    return <Route
                        key={r.link}
                        path={r.link}
                        element={
                            r.authOnly ? (
                                <ProtectedRoute>{Comp}</ProtectedRoute>
                            ) : (
                                Comp
                            )}
                    />
                })}
            </Routes>
        </BrowserRouter>
    )
}

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default AppRouter