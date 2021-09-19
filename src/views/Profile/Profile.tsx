import { useEffect, useState } from 'react'
import { message, Button } from 'antd'

import { MainLayoutWithRouter } from '../../components'

import { List, Edit } from './parts'
import { robins } from '../../robin'
import Cookies from 'universal-cookie'
import { getConfig } from '../../config'



const cookies = new Cookies();


const { UsersRobin } = robins


export function Profile(props: any) {

    const user = cookies.get('profile')


    // const [loading, toggleLoading] = useState(false)
    const [visible, toggleModal] = useState(false)
    const [data, setData] = useState(null)

    const getUser = async () => {

        try {
            await UsersRobin.when(UsersRobin.get('user', `/${user.id}`, getConfig()))

            const { data } = UsersRobin.getResult('user')

            console.log(UsersRobin.getResult('user'))

            setData(data)
        }

        catch (err) {
            console.error(err)
            message.error('Error while fetching user info')
        }

    }

    useEffect(() => {
        getUser()
    }, [visible])



    return <MainLayoutWithRouter>
        <div className='page-title'>Profile</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>
            <Button onClick={() => toggleModal(true)}> Edit Profile </Button>
        </div>
        <List user={data} />
        <Edit visible={visible} handleModal={toggleModal} user={data} />
    </MainLayoutWithRouter>
}