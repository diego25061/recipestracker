import React, { useState } from 'react'
import { Card, Form, Input, Button, Typography, Space, Layout, App, Alert } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { loginCardStyle, loginContentStyle, loginFooterStyle, loginLayoutStyle } from '@/styles/LoginStyles'
import { apiRegister } from '@/api/auth'
import { notifySuccess } from '@/utils/notifications'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const { Title } = Typography
const { Content, Footer } = Layout

export const SignUpPage: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const navigate = useNavigate()

    const { notification: notificationInstance } = App.useApp()

    const onFinish = async (values: { name: string; email: string; password: string; confirm: string }) => {
        try {
            setLoading(true)
            await apiRegister(values.name, values.email, values.password)
            notifySuccess(
                notificationInstance,
                `Account created`,
            )
            navigate('/login')
        } catch (err) {
            console.error(err)
            setError(err as string)
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
                                Create Your Account
                            </Title>
                        </div>

                        <Form
                            name="signup"
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Your Name" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email' }]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="you@example.com" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="••••••••"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirm"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error('Passwords do not match'))
                                        }
                                    })
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Repeat password"
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
                                                Sign Up
                                            </Button>
                                            <Button type="link" onClick={() => navigate('/login')}>
                                                ← Back to Login
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
