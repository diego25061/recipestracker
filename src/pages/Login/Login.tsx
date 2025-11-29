import React, { useState } from 'react'
import { Card, Form, Input, Button, Typography, Space, Layout, Alert } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { apiLogin } from '@/api/auth'
import { useAuthStore } from '@/context/AuthContext'
import { LoadingSpinner } from '@/components/LoadingSpinner' 
import { loginLayoutStyle, loginContentStyle, loginCardStyle, loginFooterStyle } from '@/styles/LoginStyles'

const { Title } = Typography
const { Content, Footer } = Layout

export const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const { setJwt, setUserData } = useAuthStore()
    const navigate = useNavigate()

    const onLogin = async (values: { email: string; password: string }) => {
        try {
            setLoading(true)
            const loginResult = await apiLogin(values.email, values.password)
            setError(undefined)
            setJwt(loginResult.jwt)
            setUserData(loginResult.userData)
            navigate('/')
        } catch (err) {
            console.error(err)
            //needs more tailored messages based on login logic or client networking
            setError("Invalid username or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout className={loginLayoutStyle}>
            <Content className={loginContentStyle}>
                <Card title="🍳 Recipe Tracker" className={loginCardStyle}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Title level={4} style={{ margin: 0 }}>
                                🔑 Login to Your Account
                            </Title>
                        </div>

                        <Form
                            name="login"
                            layout="vertical"
                            onFinish={onLogin}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="you@example.com"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="••••••••"
                                />
                            </Form.Item>
                            {error && (
                                <Form.Item>
                                    <Alert
                                        message={error}
                                        type="error"
                                        showIcon
                                    />
                                </Form.Item>
                            )}
                            <Form.Item>
                                {
                                    loading ?
                                        <LoadingSpinner style={{ padding: '0px' }} /> :
                                        <Space
                                            direction="horizontal"
                                            style={{ width: '100%', justifyContent: 'space-between' }}
                                        >
                                            <Button type="primary" htmlType="submit">
                                                Login
                                            </Button>
                                            <Button type="link" onClick={() => navigate('/signup')}>
                                                → Sign Up
                                            </Button>
                                        </Space>
                                }
                            </Form.Item>
                        </Form>
                    </Space>
                </Card>
            </Content>

            <Footer className={loginFooterStyle}>
                “Cooking is coding, but tastier.”
            </Footer>
        </Layout>
    )
}
