import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardText,
} from "reactstrap";
import classnames from "classnames";

import Pages401 from "../Utility/pages-401";
import axios from "axios";
import { ROLE } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import { saveAuthor } from "../../store/actions/author";
import ManageBook from "./ManageBook";
import ManageAuthor from "./ManageAuthor";
import ManageBookReservation from "./ManageBookReservation";
import ManageLibraryCard from "./ManageLibraryCard";
import ManageBookLending from "./ManageBookLending";
import ManageMember from "./ManageMember";

const Admin = () => {
    const role = useSelector((state) => state.token.role);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.token);
    const saveAuthor = (author) => dispatch(saveAuthor(author));

    const [isReloadBookData, setIsReloadBookData] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <div className="page-content">
            <Container fluid>
                {role !== ROLE.ADMIN && role !== ROLE.LIBRARIAN ? (
                    <Pages401 />
                ) : (
                    <>
                        <Row>
                            <Col xs="12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0 font-size-18">Management</h4>
                                </div>
                            </Col>
                        </Row>
                        <Nav tabs className="nav-tabs-custom">
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: activeTab === "1",
                                    })}
                                    onClick={() => {
                                        toggleTab("1");
                                    }}
                                >
                                    <span className="d-none d-sm-block">Author</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: activeTab === "2",
                                    })}
                                    onClick={() => {
                                        toggleTab("2");
                                    }}
                                >
                                    <span className="d-none d-sm-block">Book</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: activeTab === "3",
                                    })}
                                    onClick={() => {
                                        toggleTab("3");
                                    }}
                                >
                                    <span className="d-none d-sm-block">Library Card</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: activeTab === "4",
                                    })}
                                    onClick={() => {
                                        toggleTab("4");
                                    }}
                                >
                                    <span className="d-none d-sm-block">Book Reservation</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: activeTab === "5",
                                    })}
                                    onClick={() => {
                                        toggleTab("5");
                                    }}
                                >
                                    <span className="d-none d-sm-block">Book Lending</span>
                                </NavLink>
                            </NavItem>
                            {role === ROLE.ADMIN ? (
                                <NavItem>
                                    <NavLink
                                        style={{ cursor: "pointer" }}
                                        className={classnames({
                                            active: activeTab === "6",
                                        })}
                                        onClick={() => {
                                            toggleTab("6");
                                        }}
                                    >
                                        <span className="d-none d-sm-block">Member</span>
                                    </NavLink>
                                </NavItem>
                            ) : (
                                <></>
                            )}
                        </Nav>

                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <ManageAuthor />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <ManageBook isReloadBookData={isReloadBookData} />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <ManageLibraryCard />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="4">
                                <Row>
                                    <Col sm="12">
                                        <ManageBookReservation
                                            isReloadBookData={isReloadBookData}
                                            setIsReloadBookData={setIsReloadBookData}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="5">
                                <Row>
                                    <Col sm="12">
                                        <ManageBookLending
                                            isReloadBookData={isReloadBookData}
                                            setIsReloadBookData={setIsReloadBookData}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                            {role === ROLE.ADMIN ? (
                                <TabPane tabId="6">
                                    <Row>
                                        <Col sm="12">
                                            <ManageMember />
                                        </Col>
                                    </Row>
                                </TabPane>
                            ) : (
                                <></>
                            )}
                        </TabContent>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Admin;
