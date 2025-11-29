import { Flex, Layout } from "antd"
import { Content, Footer } from "antd/es/layout/layout"
import { Header } from "./Header"
import { css } from "@emotion/css"

const layoutStyle = {
    minHeight: '100vh',
}

const footerStyle = css`
    margin-bottom: 32px;
`

interface AppLayoutProps {
    children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return <>
        <Flex gap="middle" wrap>
            <Layout style={layoutStyle}>
                <Header />
                <Content >
                    {children}
                </Content>
                <Footer className={footerStyle}></Footer>
            </Layout>
        </Flex>
    </>
}