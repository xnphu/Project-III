import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Form, Label, Input, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import classnames from 'classnames';

//Import Star Ratings
import StarRatings from 'react-star-ratings';

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";


//Import Product Images
import product1 from "../../assets/images/product/img-1.png";
import product2 from "../../assets/images/product/img-2.png";
import product3 from "../../assets/images/product/img-3.png";
import product4 from "../../assets/images/product/img-4.png";
import product5 from "../../assets/images/product/img-5.png";
import product6 from "../../assets/images/product/img-6.png";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import axios from 'axios';
import { BASE_API_URL, BOOK_STATUS, BOOK_STATUS_LABEL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { saveBook } from '../../store/actions/book';
import TablePagination from '../../components/CommonForBoth/TablePagination';

const Home = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const books = useSelector(state => state.book.books);
    const onSaveBook = book => dispatch(saveBook(book));

    const [bookStatus, setBookStatus] = useState([
        { value: BOOK_STATUS.AVAILABLE, label: BOOK_STATUS_LABEL.AVAILABLE },
        { value: BOOK_STATUS.RESERVED, label: BOOK_STATUS_LABEL.RESERVED },
        { value: BOOK_STATUS.LOANED, label: BOOK_STATUS_LABEL.LOANED },
        { value: BOOK_STATUS.LOST, label: BOOK_STATUS_LABEL.LOST },
    ]);
    const PAGE_SIZE = 9;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [filterFields, setFilterFields] = useState([
        { id: 1, name: "Titles", link: "#" },
        { id: 2, name: "Authors", link: "#" },
        { id: 3, name: "Subjects", link: "#" },
    ]);
    const [activeTab, setActiveTab] = useState('1');
    const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);

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
                onSaveBook({
                    books: allBooks,
                    total: allBooks.length
                });
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Home" breadcrumbItem="Book" />
                    <Row>
                        <Col lg="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        Filter
                                    </CardTitle>
                                    <div>
                                        <ul className="list-unstyled product-list">
                                            {
                                                filterFields.map((field, key) =>
                                                    <li key={"_li_" + key}><Link to={field.link}><i className="font-size-14"></i>{field.name}</Link></li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="9">
                            <Row className="mb-3">
                                <Col xl="4" sm="6">
                                    <div className="mt-2">
                                        <h5>Books</h5>
                                    </div>
                                </Col>
                                <Col lg="8" sm="6">
                                    <Form className="mt-4 mt-sm-0 float-sm-right form-inline">
                                        <Dropdown
                                            isOpen={isShowFilterDropdown}
                                            toggle={() =>
                                                setIsShowFilterDropdown(!isShowFilterDropdown)
                                            }
                                            className="mr-4 float-sm-left">
                                            <DropdownToggle className="btn btn-primary" caret>
                                                Keyword{" "}
                                                <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Title</DropdownItem>
                                                <DropdownItem>Author</DropdownItem>
                                                <DropdownItem>Subject</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <div className="search-box mr-2">
                                            <div className="position-relative">
                                                <Input type="text" className="form-control border-0" placeholder="Search..." />
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>
                                        {/* <Nav className="product-view-nav" pills>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '1' })}
                                                    onClick={() => { toggleTab('1'); }}
                                                >
                                                    <i className="bx bx-grid-alt"></i>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '2' })}
                                                    onClick={() => { toggleTab('2'); }}
                                                >
                                                    <i className="bx bx-list-ul"></i>
                                                </NavLink>
                                            </NavItem>
                                        </Nav> */}
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    books
                                    .slice(
                                        currentPage * PAGE_SIZE,
                                        (currentPage + 1) * PAGE_SIZE
                                    )
                                    .map((book, key) =>
                                        <Col xl="4" sm="6" key={book.id}>
                                            <Card style={{ height: '300px' }}>
                                                <CardBody>
                                                    <div className="product-img position-relative">
                                                        <img src={book.previewUrl} alt="" className="img-fluid mx-auto d-block" style={{ height: '100px' }} />
                                                    </div>
                                                    <div className="mt-4 text-center">
                                                        <h5 className="mb-3 text-truncate">
                                                            {/* <Link to={"/ecommerce-product-detail/" + product.id} className="text-dark"> */}
                                                            {book.title}
                                                            {/* </Link> */}
                                                        </h5>
                                                        <div className="text-muted mb-3">
                                                            {book.title}
                                                        </div>
                                                        <h5 className="my-0">
                                                            <span className="text-muted mr-2">
                                                                {book.status}
                                                            </span>
                                                        </h5>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                }
                            </Row>

                            <Row>
                                <Col lg="12">
                                    <TablePagination
                                        pageSize={PAGE_SIZE}
                                        length={books.length}
                                        currentPage={currentPage}
                                        handleClickPage={handleClickPage}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );

}

export default Home;