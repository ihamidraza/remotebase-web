import React from 'react'
import { Layout } from 'antd';

import { withRouter } from 'react-router-dom';

import './Main.css'

const { Header, Content, Footer } = Layout;


export function MainLayout(props: any) {
    console.log(props)
    return (
        <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '85vh', marginLeft: '15vw' }}>
							{props.children}
						</div>
    
            </Content>
            <Footer style={{ textAlign: 'center' }}>Remote Web ©2021 Created by Team glasc.io</Footer>
        </Layout>)

}

export const MainLayoutWithRouter = withRouter(MainLayout);

