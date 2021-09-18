
import { useEffect, useState } from 'react'
import { message, Button } from 'antd'

import { MainLayoutWithRouter } from '../../components'

import { List, AddActivity } from './parts'
import { robins } from '../../robin'

const { ActivitiesRobin } = robins


export function Activities(props: any) {

    const [loading, toggleLoading] = useState(false)
    const [visible, toggleModal] = useState(false)
    const [activities, setActivities] = useState([])

    const getActivities = async () => {

        toggleLoading(true)

        try {
            await ActivitiesRobin.when(ActivitiesRobin.find())

            const { data } = (ActivitiesRobin.getCollection() as any)

            setActivities(data)

        }
        catch (err) {
            console.error(err)
            message.error('Error while fetching activities')
        } finally {
            toggleLoading(false)
        }
    }

    // const data = [{
    //     name: 'Bowling',
    //     type: 'Outdoor',
    //     tags: ['bowling', 'outdoor'],
    //     location: 'F-9, Islamabad',
    //     start_time: '2021-09-21 08:00 PM',
    //     end_time: '2021-09-21 09:00 PM',
    //     created_by: 'Hamid',
    //     description: 'Outdoor Activity'

    // }]

    useEffect(() => {
        getActivities()
    }, [])

    return <MainLayoutWithRouter>
        <h1>Activities</h1>
        <div style={{display: 'flex', justifyContent: 'flex-end', margin: 20}}>
        <Button onClick={() => toggleModal(true)}> Add Activity </Button>
            </div>
        <List data={activities} loading={loading} />
        <AddActivity visible={visible} handleModal={toggleModal} />
    </MainLayoutWithRouter>
}