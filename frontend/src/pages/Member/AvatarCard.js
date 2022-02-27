import React from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";

//Import Images
import profile1 from "../../assets/images/profile-img.png"
import avatarDummy from "../../assets/images/users/avatar-dummy.jpeg";

const AvatarCard = ({ profile, onClickOpenModal }) => {
    return (
        <Card className="overflow-hidden">
            <div className="bg-soft-primary">
                <Row>
                    <Col xs="7">
                        <div className="text-primary p-3">
                            <h5 className="text-primary">Welcome Back !</h5>
                            {/* <p>It will seem like simplified</p> */}
                        </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                        <img src={profile1} alt="" className="img-fluid" />
                    </Col>
                </Row>
            </div>
            <CardBody className="pt-0">
                <Row>
                    <Col sm="4">
                        <div className="avatar-md profile-user-wid mb-4">
                            <img src={avatarDummy} alt="" className="img-thumbnail rounded-circle" />
                        </div>
                        <h5 className="font-size-15 text-truncate">{profile.username}</h5>
                        {/* <p className="text-muted mb-0 text-truncate">UI/UX Designer</p> */}
                    </Col>

                    <Col sm={8}>
                        <div className="pt-4">
                            {/* <Row>
                            <Col xs="6">
                                <h5 className="font-size-15">125</h5>
                                <p className="text-muted mb-0">Projects</p>
                            </Col>
                            <Col xs="6">
                                <h5 className="font-size-15">$1245</h5>
                                <p className="text-muted mb-0">Revenue</p>
                            </Col>
                        </Row> */}
                            <div className="mt-4">
                                <div onClick={onClickOpenModal} className="btn btn-primary waves-effect waves-light btn-sm">Edit Profile <i className="mdi mdi-arrow-right ml-1"></i></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default AvatarCard;