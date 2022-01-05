import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";
import { Link } from "react-router-dom";

import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";

import Pages401 from "../Utility/pages-401";
import axios from 'axios';
import { BASE_API_URL, BOOK_STATUS, BOOK_STATUS_LABEL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import ManageBook from "./ManageBook";

const Admin = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const role = useSelector(state => state.token.role);

    const [books, setBooks] = useState([]);
    const [bookStatus, setBookStatus] = useState([
        { value: BOOK_STATUS.AVAILABLE, label: BOOK_STATUS_LABEL.AVAILABLE },
        { value: BOOK_STATUS.RESERVED, label: BOOK_STATUS_LABEL.RESERVED },
        { value: BOOK_STATUS.LOANED, label: BOOK_STATUS_LABEL.LOANED },
        { value: BOOK_STATUS.LOST, label: BOOK_STATUS_LABEL.LOST },
    ]);
    
    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/books/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                var allBooks = response.data;
                for (let i = 0; i < allBooks.length; i++) {
                    for (let j = 0; j < bookStatus.length; j++) {
                        if (allBooks[i].status === bookStatus[j].value) {
                            allBooks[i].status = bookStatus[j].label;
                        }
                    }
                }
                setBooks(allBooks);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    return (
        <div className="page-content">
            <Container fluid>
                {
                    (role != 0 && role != 1)
                        ? <Pages401 />
                        : <ManageBook books={books}/>
                }
            </Container>
        </div>

    );
}



export default Admin;