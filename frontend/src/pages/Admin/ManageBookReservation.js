import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table } from "reactstrap";

import axios from 'axios';
import { BASE_API_URL, RESERVATION_STATUS, FORMAT } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import dayjs from 'dayjs';
import { Formik } from 'formik';
import TablePagination from '../../components/CommonForBoth/TablePagination';
import { saveAuthor } from '../../store/actions/author';

const ManageBookReservation = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const [listBookReservation, setListBookReservation] = useState([]);

    const BOOK_RESERVATION_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [searchKeyword, setSearchKeyword] = useState('');

    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        fetchListBookReservation();
    }, []);

    const fetchListBookReservation = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/book-reserve/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('book-reserve ', response.data);
            if (response.data) {
                // onSaveAuthor({ authors: response.data, total: response.data.length });
                setListBookReservation(response.data);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const listBookReservationFilter = listBookReservation.filter(e => e.book_id.toLowerCase().includes(searchKeywordLowerCase));

    return (
        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <CardTitle className="mt-4 float-sm-left">List of Book Reservation </CardTitle>
                            <Row className="float-sm-right">
                                {/* <div onClick={() => setModalCreateVisibility(true)} className="btn btn-primary mt-3 mb-3 mr-4 d-lg-block float-sm-right">Add new author <i className="bx bx-plus"></i></div> */}
                                <form className="app-search d-none d-lg-block float-sm-right">
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                        />
                                        <span className="bx bx-search-alt"></span>
                                    </div>
                                </form>
                            </Row>

                            <div className="table-responsive">
                                <Table className="table-centered table-nowrap table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" style={{ width: "70px" }}>#</th>
                                            <th scope="col">Book ID</th>
                                            <th scope="col">Member ID</th> 
                                            <th scope="col">Create date</th>
                                            <th scope="col">Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listBookReservationFilter
                                                .slice(
                                                    currentPage * BOOK_RESERVATION_PAGE_SIZE,
                                                    (currentPage + 1) * BOOK_RESERVATION_PAGE_SIZE
                                                )
                                                .map((e, i) =>
                                                    <tr
                                                        key={e.id}
                                                        onClick={() => {
                                                            // setSelectedAuthor(author);
                                                            // setModalVisibility(true);
                                                        }}>
                                                        <td>
                                                            <p className="text-muted mb-0">{e.id}</p>

                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.book_id}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.member_id}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{dayjs(e.create_date).format(FORMAT.DATETIME)}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.status}</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                        }

                                    </tbody>
                                </Table>
                            </div>
                            <Row>
                                <Col lg="12">
                                    <TablePagination
                                        pageSize={BOOK_RESERVATION_PAGE_SIZE}
                                        length={listBookReservationFilter.length}
                                        currentPage={currentPage}
                                        handleClickPage={handleClickPage}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ManageBookReservation;