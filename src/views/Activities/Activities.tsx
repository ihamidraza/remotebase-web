
import { MainLayoutWithRouter } from '../../components'

import { List } from './parts'


export function Activities(props: any) {

    const data = [{
        name: 'Bowling',
        type: 'Outdoor',
        tags: ['bowling', 'outdoor'],
        location: 'F-9, Islamabad',
        start_time: '2021-09-21 08:00 PM',
        end_time: '2021-09-21 09:00 PM',
        created_by: 'Hamid',
        description: 'Outdoor Activity'

    }]

    return <MainLayoutWithRouter>
        <h1>Activities</h1>
        <List data={data} />
    </MainLayoutWithRouter>
}