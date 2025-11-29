import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/Login/Login'
import { MyRecipesPage } from '../../pages/MyRecipes'
import { type JSX } from 'react'
import { SignUpPage } from '@/pages/Login/SignUpPage'

interface RouteRecord {
    link: string,
    pageComponent: JSX.Element,
    authOnly?: boolean,
    omitLayout?: boolean,
    headerTitle?: string,
}

export const SiteLoginRoute: RouteRecord = { link: '/login', pageComponent: <LoginPage />, omitLayout: true }
export const HomeLoginRoute: RouteRecord = { link: '/', pageComponent: <HomePage />, headerTitle: 'Home' }

export const SiteRoutes: RouteRecord[] = [
    SiteLoginRoute,
    HomeLoginRoute,
    { link: '/signup', pageComponent: <SignUpPage />, omitLayout: true },
    { link: '/my-recipes', pageComponent: <MyRecipesPage />, authOnly: true, headerTitle: 'My Recipes' }, 
]