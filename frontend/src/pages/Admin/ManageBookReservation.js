import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table } from "reactstrap";

import axios from 'axios';
import { BASE_API_URL, RESERVATION_STATUS, RESERVATION_STATUS_LABEL, FORMAT } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import dayjs from 'dayjs';
import { Formik } from 'formik';
import TablePagination from '../../components/CommonForBoth/TablePagination';
import SweetAlert from "react-bootstrap-sweetalert";

const ManageBookReservation = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const [listBookReservation, setListBookReservation] = useState([]);
    const [isReloadData, setIsReloadData] = useState(false);

    const [reservationStatus, setReservationStatus] = useState([
        { value: RESERVATION_STATUS.WAITING, label: RESERVATION_STATUS_LABEL.WAITING },
        { value: RESERVATION_STATUS.PENDING, label: RESERVATION_STATUS_LABEL.PENDING },
        { value: RESERVATION_STATUS.COMPLETED, label: RESERVATION_STATUS_LABEL.COMPLETED },
        { value: RESERVATION_STATUS.CANCELED, label: RESERVATION_STATUS_LABEL.CANCELED },
        { value: RESERVATION_STATUS.VERIFIED, label: RESERVATION_STATUS_LABEL.VERIFIED },
    ]);

    const BOOK_RESERVATION_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedReservationBook, setSelectedReservationBook] = useState({});

    const [modalVisibility, setModalVisibility] = useState(false);
    const [alert, setAlert] = useState(<></>);

    useEffect(() => {
        fetchListBookReservation();
    }, [isReloadData]);

    const fetchListBookReservation = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/book-reserve/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('book-reserve ', response.data);
            if (response.data) {
                var list = response.data;
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < reservationStatus.length; j++) {
                        if (list[i].status === reservationStatus[j].value) {
                            list[i].status = reservationStatus[j].label;
                        }
                    }
                }
                setListBookReservation(list);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    const editBookReservation = async (value) => {
        try {
            var statusFound = reservationStatus.find((e) => e.label === value.reserve_status || e.value === value.reserve_status);
            if (statusFound != undefined) {
                value.reserve_status = statusFound.value;
            }
            value.status = value.reserve_status;
            value.book_id = selectedReservationBook.book_id;
            value.member_id = selectedReservationBook.member_id;
            value.create_date = dayjs(selectedReservationBook.create_date).format(FORMAT.DATETIME);
            console.log('editBookReservation  ', value);

            const response = await axios.put(`${BASE_API_URL}/book-reserve/${selectedReservationBook.id}`, value, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                setAlert(
                    <SweetAlert
                        success
                        title="Edit book reservation success!"
                        onConfirm={() => {
                            setModalVisibility(false);
                            setAlert(<></>);
                        }}
                        onCancel={() => {
                            setModalVisibility(false);
                            setAlert(<></>);
                        }}
                    >
                    </SweetAlert>
                );
                setIsReloadData(!isReloadData);
                props.setIsReloadBookData(!props.isReloadBookData); 
            }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Edit book reservation fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                >
                </SweetAlert>
            );
        }
    }

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const listBookReservationFilter = listBookReservation.filter(e => e.book_id.toLowerCase().includes(searchKeywordLowerCase));

    return (
        <>
            {alert}
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
                                            <th scope="col">Member Information</th>
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
                                                            setSelectedReservationBook(e);
                                                            setModalVisibility(true);
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
                                                                <div className="text-muted mb-0">{e.name}</div>
                                                                <div className="text-muted mb-0">{e.email}</div>
                                                                <div className="text-muted mb-0">{e.phone}</div>
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
            <Formik
                initialValues={{
                    reserve_status: selectedReservationBook.status !== undefined
                        ? selectedReservationBook.status
                        : reservationStatus[0].label,
                }}
                onSubmit={(values) => {
                    editBookReservation(values);
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                }) => (
                    <Modal
                        className="modal-md"
                        scrollable={true}
                        isOpen={modalVisibility}
                        toggle={() => setModalVisibility(!modalVisibility)}
                    >
                        <div className="modal-header">
                            <h5
                                className="modal-title mt-0"
                                id="myLargeModalLabel"
                            >
                                Edit Book Reservation status
                            </h5>
                            <button
                                onClick={() =>
                                    setModalVisibility(false)
                                }
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <AvForm onValidSubmit={handleSubmit}>
                                <AvField
                                    value={
                                        selectedReservationBook.status !== undefined
                                            ? selectedReservationBook.status
                                            : reservationStatus[0].label
                                    }
                                    type="select"
                                    name="reserve_status"
                                    label="Status"
                                    onChange={handleChange} required>
                                    {
                                        reservationStatus.map(e => <option key={e.value}>{e.label}</option>)
                                    }
                                </AvField>
                            </AvForm>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}>
                                Save changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    setModalVisibility(false)
                                }
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </Modal>
                )}
            </Formik>
        </>
    );
}

export default ManageBookReservation;