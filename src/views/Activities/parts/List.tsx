import moment from 'moment'
import { Table, Tag, Space, Button } from 'antd'
import Cookies from 'universal-cookie'

import { ViewActivity } from './View'

import './List'
import { useState } from 'react'


const cookies = new Cookies();


interface Props {
    data: any[],
    loading: boolean,
    handleJoin: Function,
    handleDelete: Function
}

export function List(props: Props) {

    const { data, loading, handleDelete } = props

    const [visible, toggleModal] = useState(false)
    const [row, setRow] = useState(null)

    const [requested, setRequest] = useState([] as any)

    const handleJoin = (Id: string) => {
        props.handleJoin(Id)
        setRequest([...requested, Id])

    }

    const onRowClick = (record: any) => {

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
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                  text: 'Online',
                  value: 'Online',
                },
                {
                  text: 'Outdoor',
                  value: 'Outdoor',
                },
              ],
              onFilter: (value: any, record: any) => record.type.indexOf(value) === 0,
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
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
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
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => {

                const user = cookies.get('profile')

                const isRequested = requested.includes(record.id)

                return (
                    <div>
                        <Space size="middle">
                            <Button onClick={() => onRowClick(record)}>Details</Button>
                            {user.id !== record.created_by ?
                                <Button onClick={() => handleJoin(record.id)} disabled={isRequested}>{isRequested ? `Applied` : 'Apply'}</Button>
                                : <Button onClick={() => handleDelete(record.id)}> Delete </Button>}
                        </Space>
                    </div>
                )
            },
        },
    ];



    return <>
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowClassName='table-row'
        />
        <ViewActivity data={row} visible={visible} handleModal={toggleModal} />
    </>

}