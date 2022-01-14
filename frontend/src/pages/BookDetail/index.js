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
    const libraryCard = useSelector(state => state.libraryCard);

    const [book, setBook] = useState({});
    const [alert, setAlert] = useState(<></>);

    useEffect(() => {
        fetchBookById();
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

    const createBookReservation = async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/book-reserve/`, { book_id: bookId }, { headers: { Authorization: `Bearer ${token}` } });
            console.log('createBookReservation ', response.data);
            if (response.data) {
                // onSaveAuthor({ authors: response.data, total: response.data.length });
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
        switch (book.status) {
            case BOOK_STATUS.AVAILABLE:
                return (<>
                    <div
                        className="mt-3 text-center"
                        style={{ color: '#556ee6' }}
                        onClick={() => handleClickCreateBookReservation()}
                    >
                        Reserve this book
                    </div>
                </>
                );
                break;
            case BOOK_STATUS.RESERVED:
                return (<>
                    <div className="mt-3 text-center">
                        This book is reserved from <>{dayjs(book.reservation_date).format(FORMAT.DATETIME)}</>
                    </div>
                </>
                );
                break;
            case BOOK_STATUS.LOANED:
                return (<>
                    <div className="mt-3 text-center">
                        This book is loaned
                    </div>
                </>
                );
                break;
            case BOOK_STATUS.LOST:
                return (<>
                    <div className="mt-3 text-center">
                        This book is lost
                    </div>
                </>
                );
                break;
            default:
                return (<></>);
                break;
        }
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
                    onConfirm={() => history.push(`/library-card-request`)}
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