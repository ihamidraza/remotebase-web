
import { useEffect, useState } from 'react'
import { message, Button } from 'antd'

import { MainLayoutWithRouter } from '../../components'

import { List } from './parts'
import { robins } from '../../robin'

import { getConfig } from '../../config'

const { UsersRobin } = robins


export function Community(props: any) {

    const [loading, toggleLoading] = useState(false)
    // const [visible, toggleModal] = useState(false)
    const [members, setMembers] = useState([])

    const getUsers = async () => {

        toggleLoading(true)

        try {
            await UsersRobin.when(UsersRobin.get('users', '', getConfig()))

            const { data } = (UsersRobin.getResult('users') as any)

            setMembers(data)

        }
        catch (err) {
            console.error(err)
            message.error('Error while fetching members')
        } finally {
            toggleLoading(false)
        }
    }




    useEffect(() => {

        getUsers()
    }, [])

    return <MainLayoutWithRouter>
        <div className='page-title'>Community</div>
        <List data={members} loading={loading} />
    </MainLayoutWithRouter>
}