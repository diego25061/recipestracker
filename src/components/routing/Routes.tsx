import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/Login'
import { MyRecipesPage } from '../../pages/MyRecipes'
import { type JSX } from 'react'
import { SignUpPage } from '@/pages/SignUpPage'
import { FavoritesPage } from '@/pages/Favorites'

interface RouteRecord {
    link: string,
    pageComponent: JSX.Element,
    authOnly?: boolean,
    omitLayout?: boolean,
    headerTitle?: string,
}

export const SiteLoginRoute: RouteRecord = { link: '/login', pageComponent: <LoginPage />, omitLayout: true }

export const SiteRoutes: RouteRecord[] = [
    SiteLoginRoute,
    { link: '/signup', pageComponent: <SignUpPage />, omitLayout: true },
    { link: '/', pageComponent: <HomePage />, headerTitle: 'Home' },
    { link: '/my-recipes', pageComponent: <MyRecipesPage />, headerTitle: 'My Recipes' },
    { link: '/favorites', pageComponent: <FavoritesPage />, authOnly: false, headerTitle: 'Favorites' },
]