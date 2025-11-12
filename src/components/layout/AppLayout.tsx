import { Flex, Layout } from "antd"
import { Content, Footer } from "antd/es/layout/layout"
import { Header } from "./Header"

const contentStyle: React.CSSProperties = {
    //margin: 'auto',
}

const layoutStyle = {
    minHeight: '100vh',
}

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
}

interface AppLayoutProps {
    children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return <>
        <Flex gap="middle" wrap>
            <Layout style={layoutStyle}>
                <Header />
                <Content style={contentStyle} >
                    {children}
                </Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Flex>
    </>
}