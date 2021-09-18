
import { useState } from 'react'

import { Modal, Card, Tag } from 'antd'
import moment from 'moment'


interface Props {
    visible: boolean,
    handleModal: Function,
    data: any
}
export function ViewActivity(props: Props) {

    const { data, visible, handleModal } = props

    const renderTags = (tags: any) => {
        const data = JSON.parse(tags)
        return (
            <>
                {data.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    }




    return <Modal
        title={data.name}
        visible={visible}
        onCancel={() => handleModal(false)}
        footer={null}
        destroyOnClose
    >
        <Card
            bordered={false}
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <b>Type: </b> {data.type}
                    </div>
                    <div>
                        <b>Location: </b> {data.location || 'N/A'}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <b>Start Time: </b> {moment(data.start_time).format('MMM DD, LT')}
                    </div>
                    <div>
                        <b>End Time: </b> {moment(data.end_time).format('MMM DD, LT')}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <b>Max. Participants: </b> {data.allowed_participants}
                </div>
                <div>
                    <b>Tags: </b> {renderTags(data.tags)}
                </div>
            </div>
            <div><b>Details</b></div>
            <div>{data.description}</div>

        </Card>
    </Modal>


}