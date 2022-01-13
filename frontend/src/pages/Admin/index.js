import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";

import Pages401 from "../Utility/pages-401";
import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { saveAuthor } from '../../store/actions/author';
import ManageBook from "./ManageBook";
import ManageAuthor from "./ManageAuthor";
import ManageBookReservation from "./ManageBookReservation";

const Admin = () => {
    const role = useSelector(state => state.token.role);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const saveAuthor = author => dispatch(saveAuthor(author));

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
                            <ManageAuthor />
                            <ManageBook />
                            <ManageBookReservation />
                        </>
                }
            </Container>
        </div>

    );
}



export default Admin;