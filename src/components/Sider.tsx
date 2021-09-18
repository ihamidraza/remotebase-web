import React, { useState } from 'react'
import { Layout, Menu } from 'antd';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const { Sider } = Layout;

const navBar = [{
  name: 'Activities',
  path: '/activities',
  icon: <UserOutlined />
}, {
  name: 'Community',
  path: '/communities',
  icon: <UserOutlined />
}, {
  name: 'Recommendations',
  path: '/recommendations',
  icon: <UserOutlined />
}, {
  name: 'Mentorship',
  path: '/mentorship',
  icon: <UserOutlined />
},
{
  name: 'Careers',
  path: '/careers',
  icon: <UploadOutlined />
},
{
  name: 'Messages',
  path: '/messages',
  icon: <UserOutlined />
},
{
  name: 'Chatrooms',
  path: '/chatrooms',
  icon: <VideoCameraOutlined />
}
]


export function LeftSider(props: any) {

  const [selectedKey, selectKey] = useState(['1'])

  const handleClick = (path: string, key: any) => {
    selectKey([key])
    props.history.push(path)

  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
        {navBar.map(({ name, icon, path }, i) => <Menu.Item
          key={i + 1}
          icon={icon}
          onClick={() => handleClick(path, i + 1)} >{name}</Menu.Item>)
        }

      </Menu>
    </Sider>
  )

}

