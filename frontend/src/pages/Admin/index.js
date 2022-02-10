import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, CardText } from "reactstrap";
import classnames from "classnames";

import Pages401 from "../Utility/pages-401";
import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { saveAuthor } from '../../store/actions/author';
import ManageBook from "./ManageBook";
import ManageAuthor from "./ManageAuthor";
import ManageBookReservation from "./ManageBookReservation";
import ManageLibraryCard from "./ManageLibraryCard";

const Admin = () => {
    const role = useSelector(state => state.token.role);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const saveAuthor = author => dispatch(saveAuthor(author));

    const [isReloadBookData, setIsReloadBookData] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	}

    return (
        <div className="page-content">
            <Container fluid>
                {
                    (role != 0 && role != 1)
                        ? <Pages401 />
                        : <>
                            <Row>
                                <Col xs="12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0 font-size-18">Management</h4>
                                    </div>
                                </Col>
                            </Row>
                            {/* <Nav tabs className="nav-tabs-custom">
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "1"
                                        })}
                                        onClick={() => {
                                            toggleTab("1");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "2"
                                        })}
                                        onClick={() => {
                                            toggleTab("2");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Profile</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "3"
                                        })}
                                        onClick={() => {
                                            toggleTab("3");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Messages</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "4"
                                        })}
                                        onClick={() => {
                                            toggleTab("4");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Settings</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1" className="p-3">
                                    <Row>
                                        <Col sm="12">
                                            <CardText>
                                                Raw denim you probably haven't heard of them jean
                                                shorts Austin. Nesciunt tofu stumptown aliqua, retro
                                                synth master cleanse. Mustache cliche tempor,
                                                williamsburg carles vegan helvetica. Reprehenderit
                                                butcher retro keffiyeh dreamcatcher synth. Cosby
                                                sweater eu banh mi, qui irure terry richardson ex
                                                squid. Aliquip placeat salvia cillum iphone. Seitan
                                                aliquip quis cardigan american apparel, butcher
                                                voluptate nisi qui.
                                            </CardText>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2" className="p-3">
                                    <Row>
                                        <Col sm="12">
                                            <CardText>
                                                Food truck fixie locavore, accusamus mcsweeney's
                                                marfa nulla single-origin coffee squid. Exercitation
                                                +1 labore velit, blog sartorial PBR leggings next
                                                level wes anderson artisan four loko farm-to-table
                                                craft beer twee. Qui photo booth letterpress,
                                                commodo enim craft beer mlkshk aliquip jean shorts
                                                ullamco ad vinyl cillum PBR. Homo nostrud organic,
                                                assumenda labore aesthetic magna delectus mollit.
                                                Keytar helvetica VHS salvia yr, vero magna velit
                                                sapiente labore stumptown. Vegan fanny pack odio
                                                cillum wes anderson 8-bit.
                                            </CardText>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="3" className="p-3">
                                    <Row>
                                        <Col sm="12">
                                            <CardText>
                                                Etsy mixtape wayfarers, ethical wes anderson tofu
                                                before they sold out mcsweeney's organic lomo retro
                                                fanny pack lo-fi farm-to-table readymade. Messenger
                                                bag gentrify pitchfork tattooed craft beer, iphone
                                                skateboard locavore carles etsy salvia banksy hoodie
                                                helvetica. DIY synth PBR banksy irony. Leggings
                                                gentrify squid 8-bit cred pitchfork. Williamsburg
                                                banh mi whatever gluten-free, carles pitchfork
                                                biodiesel fixie etsy retro mlkshk vice blog.
                                                Scenester cred you probably haven't heard of them,
                                                vinyl craft beer blog stumptown. Pitchfork
                                                sustainable tofu synth chambray yr.
                                            </CardText>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="4" className="p-3">
                                    <Row>
                                        <Col sm="12">
                                            <CardText>
                                                Trust fund seitan letterpress, keytar raw denim
                                                keffiyeh etsy art party before they sold out master
                                                cleanse gluten-free squid scenester freegan cosby
                                                sweater. Fanny pack portland seitan DIY, art party
                                                locavore wolf cliche high life echo park Austin.
                                                Cred vinyl keffiyeh DIY salvia PBR, banh mi before
                                                they sold out farm-to-table VHS viral locavore cosby
                                                sweater. Lomo wolf viral, mustache readymade
                                                thundercats keffiyeh craft beer marfa ethical. Wolf
                                                salvia freegan, sartorial keffiyeh echo park vegan.
                                            </CardText>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent> */}
                            <ManageAuthor />
                            <ManageBook isReloadBookData={isReloadBookData} />
                            <ManageLibraryCard />
                            <ManageBookReservation isReloadBookData={isReloadBookData} setIsReloadBookData={setIsReloadBookData} />
                        </>
                }
            </Container>
        </div>

    );
}



export default Admin;