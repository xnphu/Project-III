import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";

import Pages401 from "../Utility/pages-401";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ManageBook from "./ManageBook";

const Admin = () => {
    const role = useSelector(state => state.token.role);

    return (
        <div className="page-content">
            <Container fluid>
                {
                    (role != 0 && role != 1)
                        ? <Pages401 />
                        : <ManageBook />
                }
            </Container>
        </div>

    );
}



export default Admin;