import moment from 'moment'
import { Table, Tag, Space, Button, message } from 'antd'
import Cookies from 'universal-cookie'

import { ViewActivity } from './View'

import { robins } from '../../../robin'
import { getConfig } from '../../../config'

import './List'
import { useState } from 'react'
import React from 'react'


const cookies = new Cookies();

const { ActivitiesRobin, LoginRobin } = robins


interface Props {
    data: any[],
    loading: boolean
}

export function List(props: Props) {

    const { data, loading } = props

    const [visible, toggleModal] = useState(false)
    const [row, setRow] = useState(null)

    const onRowClick = (record: any) => {
        setRow(record)
        toggleModal(true)
    }

    const renderTags = (tags: any) => {
        return (
            <>
                {tags.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                }

                )}
            </>)
    }

    const filterInterests = (items: any) => {
        const interestArray: any[] = [];
        items.map((item: any) => item.interests.map((interest: any) => interestArray.push(interest)))
        return (
            [...new Set(interestArray) as any].map( (interests: any) => {return {
                text: interests,
                value: interests
            }}))
    }

    const filterSkills = (items: any) => {
        const skillsArray: any[] = [];
        items.map((item: any) => item.skills.map((skill: any) => skillsArray.push(skill)))
        return (
            [...new Set(skillsArray) as any].map( (skills: any) => {return {
                text: skills,
                value: skills
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
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            sorter: (a: any, b: any) => a.designation.localeCompare(b.designation),

        },
        {
            title: 'Organization',
            dataIndex: 'company',
            key: 'company',
            filters: [...new Set(data.map(item => item.company)) as any].map( (company: any) => {return {
                text: company,
                value: company
            }}),
            onFilter: (value: any, record: any) => record.company.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.company.localeCompare(b.company),

        },
        
        // {
        //     title: 'Phone',
        //     dataIndex: 'phone_number',
        //     key: 'phone_number',

        // },
        // {
        //     title: 'City',
        //     dataIndex: 'city',
        //     key: 'city',
        //     sorter: (a: any, b: any) => a.city.localeCompare(b.city),

        // },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            filters: [...new Set(data.map(item => item.country)) as any].map( (country: any) => {return {
                text: country,
                value: country
            }}),
            onFilter: (value: any, record: any) => record.country.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.country.localeCompare(b.country),
        },
        {
            title: 'Interests',
            key: 'interests',
            dataIndex: 'interests',
            filters: filterInterests(data),
            onFilter: (value: any, record: any) => record.interests.includes(value),
            render: renderTags,
        },
        {
            title: 'Skills',
            key: 'skills',
            dataIndex: 'skills',
            filters: filterSkills(data),
            onFilter: (value: any, record: any) => record.skills.includes(value),
            render: renderTags,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <div>
                    <Button onClick={() => onRowClick(record)}>Details</Button>
                            
                </div>
                )
        },
    ];

    console.log(data)

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