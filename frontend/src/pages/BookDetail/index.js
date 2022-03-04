import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, } from "reactstrap";

import axios from 'axios';
import { BASE_API_URL, BOOK_STATUS, BOOK_STATUS_LABEL, FORMAT } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Link, useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const BookDetail = (props) => {
    const bookId = props.match.params.id;

    const history = useHistory();

    const token = useSelector(state => state.token.token);
    const userId = useSelector(state => state.profile.id);
    const libraryCard = useSelector(state => state.libraryCard);

    const [book, setBook] = useState({});
    const [listBookReserve, setListBookReserve] = useState([]);
    const [listBookLend, setListBookLend] = useState([]);
    const [alert, setAlert] = useState(<></>);

    useEffect(() => {
        fetchBookById();
        fetchBookReserveByBookId();
        fetchBookLendByBookId();
    }, []);

    const fetchBookById = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/books/${bookId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('book ', response.data);
            if (response.data) {
                setBook(response.data);
            }
        } catch (error) {
            console.log('err fetchBookById', error?.response?.data);

        }
    }

    const fetchBookReserveByBookId = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/book-reserve/${bookId}/book`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('list book reserve', response.data);
            if (response.data) {
                setListBookReserve(response.data);
            }
        } catch (error) {
            console.log('err fetchBookReserveByBookId', error?.response?.data);

        }
    }

    const fetchBookLendByBookId = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/book-lend/${bookId}/book`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('list book lend', response.data);
            if (response.data) {
                setListBookLend(response.data);
            }
        } catch (error) {
            console.log('err fetchBookLendByBookId', error);

        }
    }

    const createBookReservation = async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/book-reserve/`, { book_id: bookId }, { headers: { Authorization: `Bearer ${token}` } });
            console.log('createBookReservation ', response.data);
            if (response.data) {
                setAlert(
                    <SweetAlert
                        success
                        title="Reserve book success"
                        onConfirm={() => setAlert(<></>)}
                        onCancel={() => setAlert(<></>)}
                    >
                        You must come to library to confirm your reservation within 1 day, start lending this book or we will cancel your reservation.
                    </SweetAlert>
                );
                fetchBookById();
            }
        } catch (error) {
            console.log('err ', error?.response?.data);
            setAlert(
                <SweetAlert
                    danger
                    title="Fail to reserve this book"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                >
                    {error?.response?.data.message?.message ?? ''}
                </SweetAlert>
            );
        }
    }

    const renderWithBookStatus = () => {
        const listReserveFilter = listBookReserve.filter(e => e.member_id === userId);
        const listLendFilter = listBookLend.filter(e => e.member_id === userId);
        return (
            <>
                {
                    listReserveFilter.length === 0 && listLendFilter.length === 0
                        ? <div
                            className="mt-3 text-center"
                            style={{ color: '#556ee6', cursor: 'pointer' }}
                            onClick={() => handleClickCreateBookReservation()}
                        >
                            Reserve this book
                        </div>
                        : <div
                            className="mt-3 text-center"
                            style={{ color: '#556ee6' }}
                        >
                            You reserved/lent this book
                        </div>
                }
            </>
        );
    }

    const handleClickCreateBookReservation = () => {
        if (libraryCard?.id != undefined) {
            createBookReservation();
        } else {
            setAlert(
                <SweetAlert
                    danger
                    title="Fail to reserve this book"
                    confirmBtnText="Request a library card"
                    onConfirm={() => history.push(`/profile/${userId}`)}
                    onCancel={() => {
                        setAlert(<></>);
                    }}
                >
                    You don't have a library card to reserve this book
                </SweetAlert>
            );
        }
    }

    return (
        <div className="page-content">
            <Container fluid>
                {alert}
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4 text-center"><h2>Book information</h2></CardTitle>
                        <Row>
                            <Col xl="2">
                                <a href={`https://books.google.com/books?isbn=${book.isbn}`} target="_blank" className="text-dark">
                                    <img src={book.previewUrl} alt="" className="img-fluid mx-auto d-block" style={{ width: '150px', height: '200px' }} />
                                </a>
                                {renderWithBookStatus()}

                                <div>
                                    <h6 className="mt-3">List of members reserve this book</h6>
                                    <ul className="list-unstyled product-list">
                                        {
                                            listBookReserve.map((e, index) =>
                                                <li key={"_li_" + index} >
                                                    <div >{`${index+1}. ${e.name}`}</div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <br></br>
                                <div>
                                    <h6 className="mt-3">List of members lend this book</h6>
                                    <ul className="list-unstyled product-list">
                                        {
                                            listBookLend.map((e, index) =>
                                                <li key={"_li_" + index} >
                                                    <div >{`${index+1}. ${e.name}`}</div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </Col>
                            <Col xl="10">
                                <h3 className="mb-3">{book.title}</h3>
                                <div className="mb-3"><b>Author: </b> {book.author_name}</div>
                                <div className="mb-3"><b>Publisher: </b> {book.publisher}</div>
                                <div className="mb-3"><b>Publish date: </b> {dayjs(book.publish_date).format(FORMAT.DATE)}</div>
                                <p className="mb-3"><b>Description: </b> {book.description}</p>
                                <br></br>
                                {
                                    book.author_description != null
                                        ? <>
                                            <div className="mb-3">
                                                <b>About author:</b>
                                            </div>
                                            <p className="mb-3"> {book.author_description}
                                            </p>
                                            <br></br>
                                        </>
                                        : ''
                                }
                                <div className="mb-3"><b>Subject: </b> {book.subject}</div>
                                <div className="mb-3"><b>Length: </b> {book.number_of_pages} pages</div>
                                <div className="mb-3"><b>Language: </b> {book.language}</div>
                                <div className="mb-3"><b>ISBN: </b> {book.isbn}</div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

            </Container>
        </div>
    );
}

export default BookDetail;