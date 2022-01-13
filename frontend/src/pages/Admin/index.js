import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";

import Pages401 from "../Utility/pages-401";
import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { saveAuthor } from '../../store/actions/author';
import ManageBook from "./ManageBook";
import ManageAuthor from "./ManageAuthor";

const Admin = () => {
    const role = useSelector(state => state.token.role);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const saveAuthor = author => dispatch(saveAuthor(author));

    // useEffect(() => {
    //     fetchAllAuthors();
    // }, []);

    // const fetchAllAuthors = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_API_URL}/authors/`, { headers: { Authorization: `Bearer ${token}` } });
    //         console.log('authors ', response.data);
    //         if (response.data) {
    //             saveAuthor({ authors: response.data, total: response.data.length });
    //         }
    //     } catch (error) {
    //         console.log('err ', error);
    //     }
    // }

    return (
        <div className="page-content">
            <Container fluid>
                {
                    (role != 0 && role != 1)
                        ? <Pages401 />
                        : <>
                            {/* <ManageAuthor /> */}
                            <ManageBook />
                        </>
                }
            </Container>
        </div>

    );
}



export default Admin;