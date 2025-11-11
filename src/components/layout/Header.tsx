import { useAuthStore } from '@/context/AuthContext'
import { Layout, Menu } from 'antd'
const { Header: AntHeader } = Layout

export const Header: React.FC = () => {

    const { isAuthenticated } = useAuthStore()

    const items = [
        { key: 'home', label: 'Home' },
        { key: 'my-recipes', label: 'My Recipes' },
        { key: 'favorites', label: 'Favorites' },
        isAuthenticated ? { key: 'profile', label: 'Profile' } : { key: 'login', label: 'Login' },
    ]

    return (
        <AntHeader style={{ display: 'flex', alignItems: 'center', borderRadius: 0 }}>
            <div style={{ color: 'white', fontWeight: 'bold', marginRight: '2rem' }}>🍳 RecipeVault</div>
            <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                style={{ flex: 1, minWidth: 0 }}
            />
        </AntHeader>
    )
}