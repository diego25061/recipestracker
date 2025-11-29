import { useAuthStore } from '@/context/AuthContext'
import { Button, Layout, Menu, Space } from 'antd'
import { SiteLoginRoute, SiteRoutes } from '../routing/Routes'
import { useLocation, useNavigate } from 'react-router-dom'
import { css } from '@emotion/css'
const { Header: AntHeader } = Layout

const headerStyle = css`
    display: flex;
    align-items: center;
    border-radius: 0px;
`

const titleStyle = css`
    color: white;
    font-weight: bold;
    margin-right: 2rem;
`

export const Header: React.FC = () => {

    const { isAuthenticated, logout } = useAuthStore()
    const navigate = useNavigate()
    const location = useLocation()

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

    const handleLogin = () => navigate(SiteLoginRoute.link)
    const handleLogout = () => logout?.()

    return (
        <AntHeader className={headerStyle}>
            <div className={titleStyle}>🍳 Recipe Tracker</div>
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