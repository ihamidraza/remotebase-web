import moment from 'moment'
import { Table, Tag, Space, Button, message } from 'antd'

import { robins } from '../../../robin'
import { getConfig } from '../../../config'

const { ActivitiesRobin } = robins


interface Props {
    data: any[],
    loading: boolean
}

export function List(props: Props) {

    const { data, loading } = props

    const handleJoin = async (activityId: number) => {

        try {

            await ActivitiesRobin.when(ActivitiesRobin.post('post', `/${activityId}/request`, data, getConfig()))

            message.success('Your request has been sent sucessfully')

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
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            sorter: (a: any, b: any) => a.location.localeCompare(b.location),

        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (value: string) => moment(value).format('MMM DD, LT')
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
            render: (value: string) => moment(value).format('MMM DD, LT')

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
                    {Array.isArray(tags) ? tags.map((tag: any) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    }) : tags}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button onClick={() => handleJoin(record.id)}> Join </Button>
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