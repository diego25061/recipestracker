import { Layout, Flex, Card, Row, Col, Button, Input } from "antd";
import {  Content, Footer } from "antd/es/layout/layout";
import React from "react";

import { Header } from "./components/layout/Header";



const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  margin: 'auto',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  minHeight: '100vh',
};

const searchBarStyle: React.CSSProperties = { 
  color: '#fff',
  //height: 64,
  padding: '24px 36px',
  paddingInline: 48, 
  backgroundColor: '#80b6ff',
};

function App() {
  return <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header/>
      <Content style={contentStyle} >

        <Row style={searchBarStyle}>
          <Input.Search placeholder="Search" variant="outlined" />
        </Row>
        <Row >

          {[1, 2, 2, 2, 22, 4].map(a =>
            <Col
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '33%' }}
              lg={{ flex: '25%' }}
              xl={{ flex: '20%' }}>
              <Card title="Card title" variant="borderless" style={{ margin: 8 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          )
          }
        </Row>

      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Flex>
}


export default App
