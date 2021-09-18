import { useState } from 'react'
import {
    Form,
    Input,
    Button,
    message
} from 'antd';

import { robins } from '../robin'


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

const { LoginRobin } = robins
export function SignIn(props: any) {
    const [form] = Form.useForm();

    const [loading, toggleLoading] = useState(false)

    const onFinish = async (values: any) => {
        const data = JSON.stringify(values)
        console.log('Received values of form: ', values);
        toggleLoading(true)

        try {
            await LoginRobin.when(LoginRobin.post('register', '', data))

            message.success('You have been registered successfully')

        }
        catch (err) {
            console.error(err)

            message.error('Error while registering')

        }
        finally {
            toggleLoading(false)
        }
    };

    return <div style={{ marginLeft: '30vw', marginTop: '10vh' }}>
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
                <Button type="primary" htmlType="submit" loading={loading}>
                    Sign In
                </Button>
            </Form.Item>
        </Form>
    </div>

}