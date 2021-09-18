
import { useState } from 'react'

import { Modal, Card, Form, Select, Input, DatePicker, message, Button } from 'antd'

import { robins } from '../../../robin'
import { getConfig } from '../../../config'

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const { RecommendationsRobin } = robins
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

interface Props {
    visible: boolean,
    handleModal: Function
}
export function Add(props: Props) {

    const { visible, handleModal } = props

    const [form] = Form.useForm();

    const [loading, toggleLoading] = useState(false)



    const onFinish = async (values: any) => {



        console.log('Received values of form: ', values);
        toggleLoading(true)

        try {
            await RecommendationsRobin.when(RecommendationsRobin.post('new-activity', '', values, getConfig()))

            message.success('Recommendation added successfully')

            handleModal(false)


        }
        catch (err) {
            console.error(err)

            message.error('Error adding recommendation')

        }
        finally {
            toggleLoading(false)
        }

    };



    return <Modal
        title='Add A recommendation'
        visible={visible}
        onCancel={() => handleModal(false)}
        footer={null}
    >
        <Card
            bordered={false}
        >
            <Form
                {...formItemLayout}
                form={form}
                name="recommendation"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input recommendation name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="tags"
                    label="Tags"
                    rules={[{ required: true, message: 'Please add tags!' }]}
                >
                    <Select placeholder="Add tags"
                        mode="tags"
                        allowClear
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Additional Info."
                >
                    < TextArea />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </Modal>


}