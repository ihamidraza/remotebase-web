import React from 'react'
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button
  } from 'antd';

  const { Option } = Select;


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

export function SignUp(props: any) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

    return  <div style={{marginLeft: '30vw', marginTop: '10vh'}}><Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    initialValues={{
      residence: ['zhejiang', 'hangzhou', 'xihu'],
      prefix: '86',
    }}
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
      hasFeedback
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="confirm"
      label="Confirm Password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="name"
      label="Name"
      rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="city"
      label="City"
      rules={[{ message: 'Please input your city!', whitespace: true }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="country"
      label="Country"
      rules={[{ message: 'Please input your country!', whitespace: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="company"
      label="Organization"
      rules={[{ message: 'Please input your organization!', whitespace: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="gender"
      label="Gender"
      rules={[{ required: true, message: 'Please select gender!' }]}
    >
      <Select placeholder="select your gender">
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="interests"
      label="Interests"
      rules={[{ required: true, message: 'Please add your interests!' }]}
    >
      <Select placeholder="Add your interests" 
       mode="tags"
       allowClear
       >
      </Select>
    </Form.Item>

    <Form.Item
      name="skills"
      label="Skills"
      rules={[{ required: true, message: 'Please add your skills!' }]}
    >
      <Select placeholder="Add your skills" 
       mode="tags"
       allowClear
       >
      </Select>
    </Form.Item>

    <Form.Item
      name="openToHire"
      valuePropName="checked"
      {...tailFormItemLayout}
    >
      <Checkbox>
       Are you open for opportunities ?
      </Checkbox>
    </Form.Item>
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
  </Form>
  </div>

}