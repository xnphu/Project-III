import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Form, Label, Input, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import classnames from 'classnames';

//Import Star Ratings
import StarRatings from 'react-star-ratings';

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import axios from 'axios';
import { BASE_API_URL, BOOK_STATUS, BOOK_STATUS_LABEL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { saveBook } from '../../store/actions/book';
import { saveLibraryCard } from '../../store/actions/library-card';
import TablePagination from '../../components/CommonForBoth/TablePagination';

const Home = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const userId = useSelector(state => state.profile.id);
    const books = useSelector(state => state.book.books);
    const onSaveBook = book => dispatch(saveBook(book));
    const onUpdateLibraryCard = libraryCard => dispatch(saveLibraryCard(libraryCard));

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
        { id: 1, name: "Keywords", link: "#" },
        { id: 2, name: "Titles", link: "#" },
        { id: 3, name: "Authors", link: "#" },
        { id: 4, name: "Subjects", link: "#" },
    ]);
    const [selectFilterName, setSelectFilterName] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);

    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchAllBooks();
    }, [sortBy]);

    useEffect(() => {
        getLibraryCard();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/books/?sortBy=${sortBy}`, { headers: { Authorization: `Bearer ${token}` } });
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

    const getLibraryCard = async (value) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/library-card/${userId}/member/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res getLibraryCard', response.data);
            if (response.data) {
                onUpdateLibraryCard(response.data);
            }
        } catch (error) {
            console.log('err getLibraryCard', error.response.data);
        }
    }

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    var booksFilter = books;

    switch (selectFilterName) {
        case filterFields[1].name:
            booksFilter = books.filter(book => book.title.toLowerCase().includes(searchKeywordLowerCase));
            break;
        case filterFields[2].name:
            booksFilter = books.filter(book => book.author_name.toLowerCase().includes(searchKeywordLowerCase));
            break;
        case filterFields[3].name:
            booksFilter = books.filter(book => book.subject.toLowerCase().includes(searchKeywordLowerCase));
            break;
        default:
            booksFilter = books.filter(book =>
                book.title.toLowerCase().includes(searchKeywordLowerCase) ||
                book.author_name.toLowerCase().includes(searchKeywordLowerCase) ||
                book.subject.toLowerCase().includes(searchKeywordLowerCase)
            );
            break;
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
                                                    <li key={"_li_" + key} onClick={() => setSortBy(field.name)}>
                                                        <Link to={field.link}>
                                                            {`${field.name} (A->Z) `}
                                                            {sortBy === field.name ? <i className="mdi mdi-check" style={{ color: '#556ee6' }}></i> : <span></span>}
                                                        </Link></li>
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
                                        <h5>List all books</h5>
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
                                                {selectFilterName == '' ? 'Keyword' : selectFilterName}{" "}
                                                <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {
                                                    filterFields.map((field) => <DropdownItem key={field.id} onClick={() => setSelectFilterName(field.name)}>{field.name}</DropdownItem>)
                                                }
                                            </DropdownMenu>
                                        </Dropdown>
                                        <div className="search-box mr-2">
                                            <div className="position-relative">
                                                <Input
                                                    type="text"
                                                    className="form-control border-0"
                                                    placeholder="Search..."
                                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                                />
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    booksFilter
                                        .slice(
                                            currentPage * PAGE_SIZE,
                                            (currentPage + 1) * PAGE_SIZE
                                        )
                                        .map((book, key) =>
                                            <Col xl="4" sm="6" key={book.id}>
                                                <Card style={{ height: '350px' }}>
                                                    <CardBody>
                                                        <div className="product-img position-relative">
                                                            <img src={book.previewUrl} alt="" className="img-fluid mx-auto d-block" style={{ height: '100px' }} />
                                                        </div>
                                                        <div className="mt-4 text-center">
                                                            <h5 className="mb-3">
                                                                <Link to={"/books/" + book.id}>
                                                                    {book.title}
                                                                </Link>
                                                            </h5>
                                                            <div className="text-muted mb-3">
                                                                {book.author_name}
                                                            </div>
                                                            <div className="text-muted mb-3">
                                                                {book.subject}
                                                            </div>
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
                                        length={booksFilter.length}
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