import moment from 'moment'
import { Modal, Card, Tag, Row, Col, Comment, Avatar, Form, Button, Input } from 'antd'
import Cookies from 'universal-cookie'



const cookies = new Cookies();


interface Props {
    user: any
}

export function List(props: Props) {
    const { user } = props

    if (!user) return null

    console.log(user)

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



    return <>
        <Card
            bordered={false}
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <Row>
                    <Col span={12}>
                        <b>Name: </b> {user.name}
                    </Col>
                    <Col span={12}>
                        <b>Email: </b> {user.email || 'N/A'}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <b>Phone: </b> {user.phone_number}
                    </Col>
                    <Col span={12}>
                        <b>Company: </b> {user.comapny || 'N/A'}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <b>Designation: </b> {user.designation || 'N/A'}
                    </Col>
                    <Col span={12}>
                        <b>Skills: </b> {renderTags(user.skills)}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <b>Gender: </b> {user.gender}
                    </Col>
                    <Col span={12}>
                        <b>Interests: </b> {renderTags(user.interests)}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>

                        <b>City: </b>{user.city}
                    </Col>
                    <Col span={12}>

                        <b>Country: </b>{user.country}
                    </Col>

                </Row>
            </div>

        </Card>
    </>

}