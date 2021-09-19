import moment from 'moment'
import { Table, Tag, Space, Button, message } from 'antd'
import {
    LikeOutlined
} from '@ant-design/icons';
import Cookies from 'universal-cookie'

import { ViewActivity } from './View'


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

    const onRowClick = (record: any) => {
        console.log(record)

        setRow(record)
        toggleModal(true)
    }


    const filterTags = (items: any) => {
        const tagsArray: any[] = [];
        items.map((item: any) => item.tags.map((tag: any) => tagsArray.push(tag)))
        return (
            [...new Set(tagsArray) as any].map( (tag: any) => {return {
                text: tag,
                value: tag
            }}))
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
            title: 'Recommendated By',
            dataIndex: ['recommendated_by_obj', 'name'],
            key: 'recommendated_by',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            filters: filterTags(data),
            onFilter: (value: any, record: any) => record.tags.includes(value),
            render: (tags: any) => {
              
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
            title: 'Votes',
            dataIndex: 'votes',
            key: 'votes',
            sorter: (a: any, b: any) => a.votes - b.votes,
            render: (text: any, record: any) => {

                const user = cookies.get('profile')

                console.log(user.id, record.recommendated_by)

                return (
                    <Space size="middle">
                        {text} {
                        user.id !== record.recommendated_by && 
                        <Button type='link' onClick={() => handleVote(record.id)}> <LikeOutlined /> </Button>}
                    </Space>
                )
            },
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text: any, record: any) => {

        //         const user = cookies.get('profile')

        //         console.log(user.id, record.recommendated_by)

        //         return (
        //             <Space size="middle">
        //                 { <Button onClick={() => onRowClick(record)}> Details</Button>}
        //             </Space>
        //         )
        //     },
        // },
    ];



    return <>
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            // onRow={(record, rowIndex) => {
            //     return {
            //         onClick: () => onRowClick(record, rowIndex), // click row
            //     };
            // }}
            rowClassName='table-row'
        />
        <ViewActivity data={row} visible={visible} handleModal={toggleModal} />
    </>

}