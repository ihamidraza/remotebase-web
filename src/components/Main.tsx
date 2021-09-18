import React from 'react'
import { Layout } from 'antd';

import { withRouter } from 'react-router-dom';

import './Main.css'

const { Content, Footer } = Layout;


export function MainLayout(props: any) {
    console.log(props)
    return (
        <Layout>
            <Content style={{ margin: '24px 20px 0px 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '85vh', marginLeft: '210px' }}>
							{props.children}
						</div>
    
            </Content>
            <Footer style={{ textAlign: 'center' ,backgroundColor: 'white', margin: '25px 20px 15px 225px' }}>Remote Web ©2021 Created by Team glasc.io</Footer>
        </Layout>)

}

export const MainLayoutWithRouter = withRouter(MainLayout);

