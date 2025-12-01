import { useAuthStore } from '@/context/AuthContext'
import { Avatar, Button, Dropdown, Layout, Menu, Space } from 'antd'
import { SiteLoginRoute, SiteRoutes } from '../routing/Routes'
import { useLocation, useNavigate } from 'react-router-dom'
import { css } from '@emotion/css'
import { UserOutlined } from '@ant-design/icons'
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

    const { isAuthenticated, logout, userData } = useAuthStore()
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

    const userMenu = {
        items: [
            {
                key: 'user-info',
                label: (
                    <div style={{ padding: '4px 8px', cursor: 'default' }}>
                        <div style={{ fontWeight: 'bold' }}>
                            {userData?.userFullName}
                        </div>
                    </div>
                ),
                disabled: true,
            },
            {
                type: 'divider',
            },
            {
                key: 'logout',
                label: 'Logout',
                onClick: handleLogout,
            },
        ],
    }

    const userImage = userData?.userProfilePicture ?? null

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
                    //to solve linter error caused by antd menu/divider bug
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <Dropdown menu={userMenu as any} placement="bottomRight">
                        <Avatar
                            size="large"
                            src={userImage || undefined}
                            icon={!userImage ? <UserOutlined /> : undefined}
                            style={{ cursor: 'pointer' }}
                        />
                    </Dropdown>
                ) : (
                    <Button type="primary" onClick={handleLogin}>
                        Login
                    </Button>
                )}
            </Space>
        </AntHeader>
    )
}