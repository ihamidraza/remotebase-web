import React from 'react'
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button
  } from 'antd';


  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

export function SignIn(props: any) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

    return  <div style={{marginLeft: '30vw', marginTop: '10vh'}}>
        <h3>Sign In</h3>
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

    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Sign In
      </Button>
    </Form.Item>
  </Form>
  </div>

}