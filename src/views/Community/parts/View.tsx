
import { Modal, Card, Tag } from 'antd'
import moment from 'moment'


interface Props {
    visible: boolean,
    handleModal: Function,
    data: any
}
export function ViewActivity(props: Props) {

    const { data, visible, handleModal } = props

    if (!data) return null

    const renderTags = (data: any) => {
        if(!data.includes('[')) return data

        const tags = JSON.parse(data)
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
                        <b>Email: </b> {data.email}
                    </div>
                    <div>
                        <b>Phone: </b> {data.phone_number || 'N/A'}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <b>Company: </b> {data.company}
                    </div>
                    <div>
                        <b>Designation: </b> {data.designation}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <b>City: </b> {data.city}
                </div>
                <div>
                    <b>country: </b> {data.country}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <b>Interests: </b> {renderTags(data.interests)}
                </div>
                <div>
                    <b>Skills: </b> {renderTags(data.skills)}
                </div>
            </div>

        </Card>
    </Modal>


}