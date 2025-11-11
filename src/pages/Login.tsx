import React from 'react'
import { Card, Form, Input, Button, Typography, Space, Layout } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const { Content, Footer } = Layout

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
};

const contentStyle: React.CSSProperties = {
    flex:1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const cardStyle: React.CSSProperties = {
    width: 380,
    borderRadius: 12,
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: { email: string; password: string }) => {
        console.log('Login values:', values);
        localStorage.setItem('jwt', 'FAKE_JWT');
        navigate('/');
    };

    return (
        <Layout style={layoutStyle}>
            <Content style={contentStyle}>
                <Card title="🍳 RecipeVault" style={cardStyle}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Title level={4} style={{ margin: 0 }}>
                                🔑 Login to Your Account
                            </Title>
                        </div>

                        <Form
                            name="login"
                            layout="vertical"
                            onFinish={onFinish}
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

                            <Form.Item>
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
                            </Form.Item>
                        </Form>
                    </Space>
                </Card>
            </Content>

            <Footer style={footerStyle}>
                Tip: “Cooking is coding, but tastier.”
            </Footer>
        </Layout>
    );
};
