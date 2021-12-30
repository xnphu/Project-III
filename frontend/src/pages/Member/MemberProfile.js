import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Media, Table, Modal } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import mini card widgets
import MiniCards from "../../components/Common/mini-card";

//Import Images
import profile1 from "../../assets/images/profile-img.png"
import avatarDummy from "../../assets/images/users/avatar-dummy.jpeg";

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/actions/user';

const MemberProfile = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const userId = useSelector(state => state.profile.id);
    const profile = useSelector(state => state.profile);
    const onUpdateProfile = profile => dispatch(updateProfile(profile));

    const [experiences, setExperiences] = useState([
        { id: 1, iconClass: "bx-server", link: "#", designation: "Back end Developer", timeDuration: "2016 - 19" },
        { id: 2, iconClass: "bx-code", link: "#", designation: "Front end Developer", timeDuration: "2013 - 16" },
        { id: 3, iconClass: "bx-edit", link: "#", designation: "UI /UX Designer", timeDuration: "2011 - 13" },
    ]);
    const [miniCards, setMiniCards] = useState([
        { title: "Total book lend", iconClass: "bx-check-circle", text: "125" },
        { title: "Total book reserve", iconClass: "bx-hourglass", text: "12" },
        { title: "Total fine", iconClass: "bx-package", text: "$36,524" }
    ]);
    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        fetchMemberProfile();
    }, []);

    const fetchMemberProfile = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/members/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                onUpdateProfile(response.data);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    return (
        <div className="page-content">
            <Container fluid>

                {/* Render Breadcrumbs */}
                {/* <Breadcrumbs title="Contacts" breadcrumbItem="Profile" /> */}

                <Row>
                    <Col xl="4">
                        <Card className="overflow-hidden">
                            <div className="bg-soft-primary">
                                <Row>
                                    <Col xs="7">
                                        <div className="text-primary p-3">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p>It will seem like simplified</p>
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
                                            <Row>
                                                <Col xs="6">
                                                    <h5 className="font-size-15">125</h5>
                                                    <p className="text-muted mb-0">Projects</p>
                                                </Col>
                                                <Col xs="6">
                                                    <h5 className="font-size-15">$1245</h5>
                                                    <p className="text-muted mb-0">Revenue</p>
                                                </Col>
                                            </Row>
                                            <div className="mt-4">
                                                <div onClick={() => setModalVisibility(true)} className="btn btn-primary waves-effect waves-light btn-sm">Edit Profile <i className="mdi mdi-arrow-right ml-1"></i></div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4">Personal Information</CardTitle>

                                <div className="table-responsive">
                                    <Table className="table-nowrap mb-0">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Full Name :</th>
                                                <td>{profile.name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">DOB :</th>
                                                <td>{profile.date_of_birth}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Gender :</th>
                                                <td>{profile.sex == 1 ? 'Male' : 'Female'}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Mobile :</th>
                                                <td>{profile.phone}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">E-mail :</th>
                                                <td>{profile.email}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Location :</th>
                                                <td>{profile.street}, {profile.city}, {profile.country}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>

                        {/* <Card>
                            <CardBody>
                                <CardTitle className="mb-5">Experience</CardTitle>
                                <div className="">
                                    <ul className="verti-timeline list-unstyled">
                                        {
                                            experiences.map((experience, i) =>
                                                <li className={experience.id === 1 ? "event-list active" : "event-list"} key={"_exp_" + i} >
                                                    <div className="event-timeline-dot">
                                                        <i className={experience.id === 1 ? "bx bx-right-arrow-circle bx-fade-right" : "bx bx-right-arrow-circle"}></i>
                                                    </div>
                                                    <Media>
                                                        <div className="mr-3">
                                                            <i className={"bx " + experience.iconClass + " h4 text-primary"}></i>
                                                        </div>
                                                        <Media body>
                                                            <div>
                                                                <h5 className="font-size-15"><Link to={experience.link} className="text-dark">{experience.designation}</Link></h5>
                                                                <span className="text-primary">{experience.timeDuration}</span>
                                                            </div>
                                                        </Media>
                                                    </Media>
                                                </li>
                                            )
                                        }

                                    </ul>
                                </div>

                            </CardBody>
                        </Card> */}
                    </Col>

                    <Col xl="8">

                        <Row>
                            {
                                miniCards.map((card, key) =>
                                    <MiniCards title={card.title} text={card.text} iconClass={card.iconClass} key={"_card_" + key} />
                                )
                            }

                        </Row>
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4">Revenue</CardTitle>
                                <div id="revenue-chart" className="apex-charts">
                                    {/* <ApexRevenue /> */}
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4">Book lend history</CardTitle>
                                <div className="table-responsive">
                                    <Table className="table table-nowrap table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Projects</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">Deadline</th>
                                                <th scope="col">Budget</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Skote admin UI</td>
                                                <td>2 Sep, 2019</td>
                                                <td>20 Oct, 2019</td>
                                                <td>$506</td>
                                            </tr>

                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Skote admin Logo</td>
                                                <td>1 Sep, 2019</td>
                                                <td>2 Sep, 2019</td>
                                                <td>$94</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Redesign - Landing page</td>
                                                <td>21 Sep, 2019</td>
                                                <td>29 Sep, 2019</td>
                                                <td>$156</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>App Landing UI</td>
                                                <td>29 Sep, 2019</td>
                                                <td>04 Oct, 2019</td>
                                                <td>$122</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">5</th>
                                                <td>Blog Template</td>
                                                <td>05 Oct, 2019</td>
                                                <td>16 Oct, 2019</td>
                                                <td>$164</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">6</th>
                                                <td>Redesign - Multipurpose Landing</td>
                                                <td>17 Oct, 2019</td>
                                                <td>05 Nov, 2019</td>
                                                <td>$192</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">7</th>
                                                <td>Logo Branding</td>
                                                <td>04 Nov, 2019</td>
                                                <td>05 Nov, 2019</td>
                                                <td>$94</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    className="modal-lg"
                    isOpen={modalVisibility}
                    toggle={() => setModalVisibility(!modalVisibility)}
                >
                    <div className="modal-header">
                        <h5
                            className="modal-title mt-0"
                            id="myLargeModalLabel"
                        >
                            Edit Profile
                        </h5>
                        <button
                            onClick={() =>
                                setModalVisibility(false)
                            }
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <AvForm>
                            <AvField
                                name="username"
                                label="Fullname"
                                placeholder="Type fullname"
                                type="text"
                                errorMessage="Enter fullname"
                                validate={{ required: { value: true } }}
                            />
                            <AvField
                                name="dob"
                                label="DOB"
                                placeholder="Type fullname"
                                type="text"
                                errorMessage="Enter fullname"
                                validate={{ required: { value: true } }}
                            />
                            <AvField
                                name="gender"
                                label="Gender"
                                placeholder="Type fullname"
                                type="text"
                                errorMessage="Enter fullname"
                                validate={{ required: { value: true } }}
                            />
                            <AvField
                                name="phone"
                                label="Phone"
                                placeholder="Type fullname"
                                type="text"
                                errorMessage="Enter fullname"
                                validate={{ required: { value: true } }}
                            />
                            <AvField
                                name="email"
                                label="Email"
                                placeholder="Type fullname"
                                type="text"
                                errorMessage="Enter fullname"
                                validate={{ required: { value: true } }}
                            />
                            <AvField
                                name="location"
                                label="Location"
                                placeholder="Type fullname"
                                type="text"
                                errorMessage="Enter fullname"
                                validate={{ required: { value: true } }}
                            />
                        </AvForm>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">
                            Save changes
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                setModalVisibility(false)
                            }
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </Modal>

            </Container>
        </div>
    );

}

export default MemberProfile;