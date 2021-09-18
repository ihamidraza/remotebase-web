import moment from 'moment'
import { Table, Tag, Space, Button, message } from 'antd'
import Cookies from 'universal-cookie'

import { ViewActivity } from './View'

import { robins } from '../../../robin'
import { getConfig } from '../../../config'

import './List'
import { useState } from 'react'


const cookies = new Cookies();

const { ActivitiesRobin, LoginRobin } = robins


interface Props {
    data: any[],
    loading: boolean,
    handleJoin: Function,
    handleDelete: Function
}

export function List(props: Props) {

    const { data, loading, handleJoin, handleDelete } = props

    const [visible, toggleModal] = useState(false)
    const [row, setRow] = useState(null)

    const onRowClick = (record: any, rowIndex: any) => {
        console.log(record, rowIndex)

        setRow(record)
        toggleModal(true)
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
            render: (tags: any) => {
                const data = JSON.parse(tags)
                return (
                    <>
                        {data.map((tag: any) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';

                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => {

                const user = cookies.get('profile')

                console.log(user.id, record.created_by)

                return (
                    <Space size="middle">
                        {user.id !== record.created_by ?
                            <Button onClick={() => handleJoin(record.id)}> Join </Button>
                            : <Button onClick={() => handleDelete(record.id)}> Delete </Button>}
                    </Space>
                )
            },
        },
    ];



    return <>
    <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        onRow={(record, rowIndex) => {
            return {
                onClick: () => onRowClick(record, rowIndex), // click row
            };
        }}
        rowClassName='table-row'
    />
    <ViewActivity data={row} visible={visible} handleModal={toggleModal} />
        </>

}