import { useState } from 'react'
import { Table, Tag, Space, Button } from 'antd'




const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterSearch: true,
        onFilter: (value: any, record: any) => record.name.includes(value),
        sorter: (a:any, b: any) => a.name.localeCompare(b.name),
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
        sorter: (a:any, b: any) => a.location.localeCompare(b.location),

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
        sorter: (a:any, b: any) => a.created_by.localeCompare(b.created_by),
        
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
                <Button> Join </Button>
            </Space>
        ),
    },
];

interface Props  {
    data: any[]
}

export function List(props: Props) {

    const { data } = props



    return <Table
        columns={columns}
        dataSource={data}
    />

}