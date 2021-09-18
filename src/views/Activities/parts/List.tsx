import { useState } from 'react'
import { Table, Tag, Space, Button, message } from 'antd'

import { robins } from '../../../robin'

const { JoinActivityRobin, LoginRobin } = robins


interface Props {
    data: any[],
    loading: boolean
}

export function List(props: Props) {

    const { data, loading } = props

    const [requests, addRequest] = useState([] as any)

    const handleJoin = async (activityId: number) => {

        const user = LoginRobin.getResult('login')

        const data = {
            activity_id: activityId,
            user_id: user.id
        }

        try {
            await JoinActivityRobin.when(JoinActivityRobin.post('post', '', data))
            message.success('Your request has been sent sucessfully')

            addRequest([...requests, activityId])
        }
        catch (err) {
            console.error(err)
            message.error('Error while sending join request')

        }

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.name.includes(value),
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'location',
            dataIndex: 'location',
            key: 'location',
            sorter: (a: any, b: any) => a.location.localeCompare(b.location),

        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: 'Added By',
            dataIndex: 'created_by',
            key: 'created_by',
            sorter: (a: any, b: any) => a.created_by.localeCompare(b.created_by),

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: any) => (
                <>
                    {tags.map((tag: any) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button onClick={() => handleJoin(record.id)} disabled={requests.includes(record.id)}> Join </Button>
                </Space>
            ),
        },
    ];



    return <Table
        columns={columns}
        dataSource={data}
        loading={loading}
    />

}