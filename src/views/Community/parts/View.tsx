
import { Modal, Card, Tag, Row, Col } from 'antd'
import moment from 'moment'


interface Props {
    visible: boolean,
    handleModal: Function,
    data: any
}
export function ViewActivity(props: Props) {

    const { data, visible, handleModal } = props

    if (!data) return null

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
                })}
            </>
        )
    }

    return <Modal
        width={800}
        title={data.name}
        visible={visible}
        onCancel={() => handleModal(false)}
        footer={null}
        destroyOnClose
    >
        <Card
            bordered={false}
        >
            <Row>
                <Col span={12}>
                    <b>Email: </b> {data.email}
                </Col>
                <Col span={12}>
                    <b>Phone: </b> {data.phone_number || 'N/A'}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                        <b>Designation: </b> {data.designation}
                </Col>
                <Col span={12}>
                    <b>Company: </b> {data.company}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <b>City: </b> {data.city}
                </Col>
                <Col span={12}>
                    <b>Country: </b> {data.country}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <b>Interests: </b> {renderTags(data.interests)}
                </Col>
                <Col span={12}>
                    <b>Skills: </b> {renderTags(data.skills)}
                </Col>
            </Row>

        </Card>
    </Modal>


}