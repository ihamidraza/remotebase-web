
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


    const handleJoin = async (activityId: number) => {

        try {

            await ActivitiesRobin.when(ActivitiesRobin.post('post', `/${activityId}/request`, {}, getConfig()))

            message.success('Your request has been sent sucessfully')

        }
        catch (err) {
            console.error(err)
            message.error('Error while sending join request')

        }

    }

    const handleDelete = async (activityId: number) => {

        try {

            await ActivitiesRobin.when(ActivitiesRobin.delete('deleted', `/${activityId}`, getConfig()))

            message.success('Your activity has been deleted sucessfully')
            getActivities()

        }
        catch (err) {
            console.error(err)
            message.error('Error while deleting activity')

        }

    }

    useEffect(() => {
        if (!visible)
            getActivities()
    }, [visible])

    return <MainLayoutWithRouter>
        <div className='page-title'>Activities</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>
            <Button onClick={() => toggleModal(true)}> Add Activity </Button>
        </div>
        <List data={activities} loading={loading} handleJoin={handleJoin} handleDelete={handleDelete} />
        <AddActivity visible={visible} handleModal={toggleModal} />
    </MainLayoutWithRouter>
}