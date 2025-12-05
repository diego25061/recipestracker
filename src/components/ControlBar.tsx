import { Slider, Switch, Card, Space, Button } from "antd";
import { WifiOutlined, UserOutlined, CloseOutlined, SettingOutlined } from "@ant-design/icons"
import { useState } from "react"
import { css } from "@emotion/css"
import { useAuthStore } from "@/context/AuthContext"
import { apiLogin } from "@/api/auth"
import { STORAGE_KEY } from "@/mock/memoryDb";

const controlBarStyle = css`
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 260px;
    z-index: 2000;

    opacity: 0.9;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 1;
    }
`;

const controlBarOpenerStyle = css`
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 2000;

    width: 48px;
    height: 48px;
    border-radius: 24px;
    
    display: flex;
    justify-content: center;
    font-size: 24px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background-color: gainsboro;
    &:hover {
        cursor: pointer;
    }
`
//global variables, not related to react
export let EMULATED_LOAD_TIME: number = 360
export let EMULATED_NETWORK_ERRORS: boolean = false

export const ControlBar: React.FC = () => {
    const [loadTime, setLoadTime] = useState(EMULATED_LOAD_TIME)
    const [networkError, setNetworkError] = useState(EMULATED_NETWORK_ERRORS)
    const [isOpen, setOpen] = useState(false)
    const { isAuthenticated, logout, setJwt, setUserData } = useAuthStore()

    const testLogin = async () => {
        const loginResult = await apiLogin('carmen', '123')
        setJwt(loginResult.jwt)
        setUserData(loginResult.userData)
    }

    const handleReset = async () => {
        localStorage.removeItem(STORAGE_KEY)
        window.location.reload()
    }

    return (
        !isOpen ?
            <div
                className={controlBarOpenerStyle}
                onClick={() => { setOpen(true) }}
            >
                <SettingOutlined />
            </div> :
            <Card
                className={controlBarStyle}
                size="small"
                title={<span><SettingOutlined /> Web App Test Controls</span>}
                extra={
                    <CloseOutlined
                        style={{ cursor: "pointer", fontSize: 14 }}
                        onClick={() => setOpen(false)}
                    />
                }
                style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    borderRadius: 8
                }}
            >
                <Space direction="vertical" style={{ width: "100%" }}>

                    <div>
                        <strong>Network Load Time: {loadTime}ms</strong>
                        <Slider
                            min={0}
                            max={1200}
                            step={60}
                            value={loadTime}
                            onChange={(value) => {
                                setLoadTime(value)
                                EMULATED_LOAD_TIME = value
                            }}
                            tooltip={{ formatter: v => `${v} ms` }}
                        />
                    </div>

                    <Space>
                        <WifiOutlined />
                        <Switch
                            checked={networkError}
                            onChange={(value: boolean) => {
                                EMULATED_NETWORK_ERRORS = value
                                setNetworkError(value)
                            }}
                        />
                        <span>Force Network Error</span>
                    </Space>

                    <Space>
                        <UserOutlined />
                        <Switch
                            checked={isAuthenticated}
                            onChange={async (value: boolean) => {
                                if (value) {
                                    const temp = EMULATED_LOAD_TIME
                                    const temp2 = EMULATED_NETWORK_ERRORS
                                    EMULATED_LOAD_TIME = 0
                                    EMULATED_NETWORK_ERRORS = false
                                    await testLogin()
                                    EMULATED_LOAD_TIME = temp
                                    EMULATED_NETWORK_ERRORS = temp2
                                } else {
                                    logout()
                                }
                            }}
                        />
                        <span>Logged In</span>
                    </Space>

                    <Button onClick={handleReset} style={{ marginTop: 4 }}>
                        Reset DB
                    </Button>
                    <em style={{ float: 'right' }}>Built by Diego R.</em>
                </Space>
            </Card>
    )
}
