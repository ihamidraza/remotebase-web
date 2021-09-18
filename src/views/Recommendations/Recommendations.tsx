
import { useEffect, useState } from 'react'
import { message, Button } from 'antd'

import { MainLayoutWithRouter } from '../../components'

import { List, Add } from './parts'
import { robins } from '../../robin'

import { getConfig } from '../../config'

const { RecommendationsRobin } = robins


export function Recommendations(props: any) {

    const [loading, toggleLoading] = useState(false)
    const [visible, toggleModal] = useState(false)
    const [data, setData] = useState([])

    const getRecommendations = async () => {

        toggleLoading(true)

        try {
            await RecommendationsRobin.when(RecommendationsRobin.get('recommendations', '', getConfig()))

            const { data } = (RecommendationsRobin.getResult('recommendations') as any)

            setData(data)

        }
        catch (err) {
            console.error(err)
            message.error('Error while fetching recommendations')
        } finally {
            toggleLoading(false)
        }
    }


    const addVote = async (Id: number) => {

        try {

            await RecommendationsRobin.when(RecommendationsRobin.post('post', `/${Id}/upvote`, {}, getConfig()))
            getRecommendations()

            message.success('Upvoted successfully')

        }
        catch (err) {
            console.error(err)
            message.error('Error while upvoting')

        }

    }

    useEffect(() => {
        if (!visible)
            getRecommendations()
    }, [visible])

    return <MainLayoutWithRouter>
        <div className='page-title'>Recommendations</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>
            <Button onClick={() => toggleModal(true)}> Add Recommendation </Button>
        </div>
        <List data={data} loading={loading} handleVote={addVote} />
        <Add visible={visible} handleModal={toggleModal} />
    </MainLayoutWithRouter>
}