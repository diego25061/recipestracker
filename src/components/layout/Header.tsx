import { useAuthStore } from '@/context/AuthContext'
import { Button, Layout, Menu, Space } from 'antd'
import { SiteLoginRoute, SiteRoutes } from '../routing/Routes'
import { useLocation, useNavigate } from 'react-router-dom'
const { Header: AntHeader } = Layout

export const Header: React.FC = () => {

    const { isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const items = SiteRoutes
        .filter(x => !!x.headerTitle && (!x.authOnly || isAuthenticated))
        .map(x => ({
            key: x.link,
            label: x.headerTitle
        }))

    const handleMenuClick = (e: { key: string }) => {
        if (e?.key) {
            navigate(e.key)
        }
    }

    const handleLogin = () => navigate(SiteLoginRoute.link);
    const handleLogout = () => logout?.();

    return (
        <AntHeader style={{ display: 'flex', alignItems: 'center', borderRadius: 0 }}>
            <div style={{ color: 'white', fontWeight: 'bold', marginRight: '2rem' }}>🍳 Recipe Tracker</div>
            <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                selectedKeys={[location.pathname]}
                style={{ flex: 1, minWidth: 0 }}
                onClick={handleMenuClick}
            />
            <Space>
                {isAuthenticated ? (
                    <Button type="default" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <Button type="primary" onClick={handleLogin}>
                        Login
                    </Button>
                )}
            </Space>
        </AntHeader>
    )
}