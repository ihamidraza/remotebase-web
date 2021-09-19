import moment from 'moment'
import { Table, Tag, Space, Button, message } from 'antd'
import {
    LikeOutlined
} from '@ant-design/icons';
import Cookies from 'universal-cookie'

import { ViewActivity } from './View'

import { robins } from '../../../robin'
import { getConfig } from '../../../config'

import './List'
import { useState } from 'react'


const cookies = new Cookies();


interface Props {
    data: any[],
    loading: boolean,
    handleVote: Function
}

export function List(props: Props) {

    const { data, loading, handleVote } = props

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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Votes',
            dataIndex: 'votes',
            key: 'votes',
            sorter: (a: any, b: any) => a.votes - b.votes,
        },
        {
            title: 'Recommendated By',
            dataIndex: ['recommendated_by_obj','name'],
            key: 'recommendated_by',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: any) => {
                // const data = JSON.parse(tags)
                return (
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
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => {

                const user = cookies.get('profile')

                console.log(user.id, record.recommendated_by)

                return (
                    <Space size="middle">
                        {user.id !== record.recommendated_by && <Button type='link' onClick={() => handleVote(record.id)}> <LikeOutlined /> </Button>}
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