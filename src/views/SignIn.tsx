import { useState } from 'react'
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import { Link } from 'react-router-dom';

import { robins } from '../robin'
import React from 'react';
import Cookies from 'universal-cookie'

const cookies = new Cookies();


const formItemLayout = {
  labelCol: {
    xs: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    }
  },
};

const { LoginRobin } = robins
export function SignIn(props: any) {
  const [form] = Form.useForm();

  const [loading, toggleLoading] = useState(false)

  const onFinish = async (values: any) => {

    console.log('Received values of form: ', values);
    toggleLoading(true)

    try {
      await LoginRobin.when(LoginRobin.post('login', '', values))

      const { token, profile } = LoginRobin.getResult('login')

      cookies.set('token', token, { path: '/' })
      cookies.set('profile', profile)

      message.success('You have been logged in successfully')

      window.location.reload();
    }
    catch (err) {
      console.error(err)

      message.error('Error while signing in')

    }
    finally {
      toggleLoading(false)
    }
  };

  return <div style={{ display: 'flex', height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: 500, height: 500, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #CCC' }}>
      <img style={{ marginBottom: '4rem' }} src="data:image/png;base64,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" />
      <Form
        {...formItemLayout}
        form={form}
        name="singin"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        //   hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} style={{ marginTop: '3rem' }}>
          <Button type="primary" size='large' htmlType="submit" loading={loading} style={{ width: 150, marginRight: '1rem' }}>
            Sign In
          </Button>
          <Link to='/signup'>
            <Button size='large' type="primary" style={{ width: 150 }}>
              Sign Up
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  </div>
}