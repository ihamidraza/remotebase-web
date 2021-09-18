
import { useEffect, useState } from 'react'
import { message, Button } from 'antd'

import { MainLayoutWithRouter } from '../../components'

import { List, AddActivity } from './parts'
import { robins } from '../../robin'

import { getConfig } from '../../config'

const { ActivitiesRobin } = robins


export function Activities(props: any) {

    const [loading, toggleLoading] = useState(false)
    const [visible, toggleModal] = useState(false)
    const [activities, setActivities] = useState([])

    const getActivities = async () => {

        toggleLoading(true)

        try {
            await ActivitiesRobin.when(ActivitiesRobin.get('activities', '', getConfig()))

            const { data } = (ActivitiesRobin.getResult('activities') as any)

            setActivities(data)

        }
        catch (err) {
            console.error(err)
            message.error('Error while fetching activities')
        } finally {
            toggleLoading(false)
        }
    }

    useEffect(() => {
        if(!visible)
        getActivities()
    }, [visible])

    return <MainLayoutWithRouter>
        <h1>Activities</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>
            <Button onClick={() => toggleModal(true)}> Add Activity </Button>
        </div>
        <List data={activities} loading={loading} />
        <AddActivity visible={visible} handleModal={toggleModal} />
    </MainLayoutWithRouter>
}