
import { Modal, Card, Tag, Row, Col, Comment, Avatar, Form, Button, Input } from 'antd'
import moment from 'moment'
import React from 'react'


const { TextArea } = Input;

interface Props {
    visible: boolean,
    handleModal: Function,
    data: any
}
export function ViewActivity(props: Props) {

    const { data, visible, handleModal } = props

    
    if(!data) return null

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
    // const Editor = ({  }) => (
    //     <>
    //       <Form.Item>
    //         <TextArea rows={4} onChange={onChange} value={value} />
    //       </Form.Item>
    //       <Form.Item>
    //         <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
    //           Add Comment
    //         </Button>
    //       </Form.Item>
    //     </>
    //   );

    return <Modal
        width = {800}
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
                <Row>
                    <Col span={12}>
                        <b>Type: </b> {data.type}
                    </Col>
                    <Col span={12}>
                        <b>Location: </b> {data.location || 'N/A'}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <b>Start Time: </b> {moment(data.start_time).format('MMM DD, LT')}
                    </Col>
                    <Col span={12}>
                        <b>End Time: </b> {moment(data.end_time).format('MMM DD, LT')}
                    </Col>
                </Row>
            <Row>
                <Col span={12}>
                    <b>Max. Participants: </b> {data.allowed_participants}
                </Col>
                <Col span={12}>
                    <b>Tags: </b> {renderTags(data.tags)}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <b>Organizer: </b> {data.created_by}
                </Col>
                <Col span={12}>
                    <b>Location: </b> {data.location}
                </Col>
            </Row>
            <Row>
                <b>Details: </b>{data.description}
            </Row>
            </div>
            <Row>
            {/* <Comment
                avatar={
                    <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                    />
                }
                content={
                    <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                    />
                }
                /> */}
            </Row>
        </Card>
    </Modal>


}