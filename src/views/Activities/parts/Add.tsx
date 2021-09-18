
import { useState } from 'react'

import { Modal, Card, Form, Select, Input, DatePicker, message, Button, InputNumber, } from 'antd'
import moment from 'moment'

import { robins } from '../../../robin'
import { getConfig } from '../../../config'

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const { ActivitiesRobin } = robins
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
export function AddActivity(props: Props) {

    const { visible, handleModal } = props

    const [form] = Form.useForm();

    const [loading, toggleLoading] = useState(false)



    const onFinish = async (values: any) => {
        // const data = { ...values, start_time: values.time[0].toISOString, end_time: values?.time?[1]?.toISOString() }

        if (values?.time?.[0]) {
            values.start_time = values.time[0].toISOString()
        }
        if (values?.time?.[1]) {
            values.end_time = values.time[1].toISOString()
        }

        delete values.time
        
        console.log('Received values of form: ', values);
        toggleLoading(true)

        try {
            await ActivitiesRobin.when(ActivitiesRobin.post('new-activity', '', values, getConfig()))

            message.success('You have been registered successfully')

            handleModal(false)


        }
        catch (err) {
            console.error(err)

            message.error('Error while registering')

        }
        finally {
            toggleLoading(false)
        }

    };

    const activityTypes = [{ value: 'Online', label: 'Online' }, { value: 'Outdoor', label: 'Outdoor' }]



    return <Modal
        title='Add An Activity'
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
                name="acitivity"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please select activity type!' }]}
                >
                    <Select placeholder="select activity type" options={activityTypes}>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="time"
                    label="Time"
                    rules={[{ required: true, message: 'Please select time!' }]}
                >
                    <RangePicker
                        // disabledDate={disabledDate}
                        // disabledTime={disabledRangeTime}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </Form.Item>


                <Form.Item
                    name="tags"
                    label="Tags"
                    rules={[{ required: true, message: 'Please add tags!' }]}
                >
                    <Select placeholder="Add interest tags"
                        mode="tags"
                        allowClear
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    name="max_participants"
                    label="Max. "
                    rules={[
                        {
                            required: true,
                            message: 'Please input max participants!',
                        },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Additional Info."
                >
                    < TextArea />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </Modal>


}