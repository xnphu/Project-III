import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table } from "reactstrap";

import axios from 'axios';
import { BASE_API_URL, LENDING_STATUS, LENDING_STATUS_LABEL, FORMAT } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import dayjs from 'dayjs';
import { Formik } from 'formik';
import TablePagination from '../../components/CommonForBoth/TablePagination';
import SweetAlert from "react-bootstrap-sweetalert";
import { saveBookLend, editBookLend, deleteBookLend } from '../../store/actions/book-lend';

const ManageBookLending = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const bookLends = useSelector(state => state.bookLend.bookLends);

    const onSaveBookLend = bookLend => dispatch(saveBookLend(bookLend));
    const onEditBookLend = bookLend => dispatch(editBookLend(bookLend));
    const onDeleteBookLend = bookLend => dispatch(deleteBookLend(bookLend));

    const [lendingStatus, setLendingStatus] = useState([
        { value: LENDING_STATUS.LOAN, label: LENDING_STATUS_LABEL.LOAN },
        { value: LENDING_STATUS.RETURNED, label: LENDING_STATUS_LABEL.RETURNED },
        { value: LENDING_STATUS.FINISHED, label: LENDING_STATUS_LABEL.FINISHED },
    ]);

    const BOOK_LENDING_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedLendingBook, setSelectedReservationBook] = useState({});

    const [modalVisibility, setModalVisibility] = useState(false);
    const [alert, setAlert] = useState(<></>);

    useEffect(() => {
        fetchListBookLending();
    }, []);

    const fetchListBookLending = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/book-lend/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('book-lend ', response.data);
            if (response.data) {
                var list = response.data;
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < lendingStatus.length; j++) {
                        if (list[i].status === lendingStatus[j].value) {
                            list[i].status = lendingStatus[j].label;
                        }
                    }
                }
                onSaveBookLend({ bookLends: list });
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    const editBookLending = async (value) => {
        try {
            var statusFound = lendingStatus.find((e) => e.label === value.lend_status || e.value === value.lend_status);
            if (statusFound) {
                value.lend_status = statusFound.value;
            }
            var submitValue = { ...selectedLendingBook };
            submitValue.status = value.lend_status;
            submitValue.fine_amount = value.fine_amount ? value.fine_amount : selectedLendingBook.fine_amount;
            submitValue.create_date = dayjs(selectedLendingBook.create_date).format(FORMAT.DATETIME);
            submitValue.due_date = dayjs(value.due_date ? value.due_date : selectedLendingBook.due_date).format(FORMAT.DATE);
            submitValue.return_date = value.return_date
                ? dayjs(value.return_date).format(FORMAT.DATE)
                : selectedLendingBook.return_date
                    ? dayjs(selectedLendingBook.return_date).format(FORMAT.DATE)
                    : null;

            console.log('editBookLending', submitValue);

            const response = await axios.put(`${BASE_API_URL}/book-lend/${selectedLendingBook.id}`, submitValue, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                var editValue = response.data;

                // find index
                var list = bookLends;
                const index = list.findIndex((e) => e.id === editValue.id);

                editValue.index = index;
                editValue.status = statusFound.label;
                onEditBookLend(editValue);
                setAlert(
                    <SweetAlert
                        success
                        title="Edit book lending success!"
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
                setModalVisibility(false);

                // reload list book
                props.setIsReloadBookData(!props.isReloadBookData); 
            }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Edit book lending fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                >
                </SweetAlert>
            );
        }
    }

    const handleDeleteBookLend = async () => {
        try {
            const response = await axios.delete(`${BASE_API_URL}/book-lend/${selectedLendingBook.id}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data.success) {
                onDeleteBookLend({ id: selectedLendingBook.id });
                setModalVisibility(false);
                setAlert(
                    <SweetAlert
                        success
                        title="Delete book lend success!"
                        onConfirm={() => setAlert(<></>)}
                        onCancel={() => setAlert(<></>)}
                    ></SweetAlert>
                );
            }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Delete book lend fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                ></SweetAlert>
            );
        }
    }

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const listBookLendingFilter = bookLends.filter(e =>
        e.book_id.toLowerCase().includes(searchKeywordLowerCase) ||
        e.name.toLowerCase().includes(searchKeywordLowerCase) ||
        e.email.toLowerCase().includes(searchKeywordLowerCase) ||
        e.phone.toLowerCase().includes(searchKeywordLowerCase)
    );

    return (
        <>
            {alert}
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <CardTitle className="mt-4 float-sm-left">List of Book Lending </CardTitle>
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
                                            <th scope="col">Due date</th>
                                            <th scope="col">Return date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Fine ($)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listBookLendingFilter
                                                .slice(
                                                    currentPage * BOOK_LENDING_PAGE_SIZE,
                                                    (currentPage + 1) * BOOK_LENDING_PAGE_SIZE
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
                                                                <p className="text-muted mb-0">{dayjs(e.due_date).format(FORMAT.DATE)}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.return_date ? dayjs(e.return_date).format(FORMAT.DATE) : ''}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.status}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.fine_amount}</p>
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
                                        pageSize={BOOK_LENDING_PAGE_SIZE}
                                        length={listBookLendingFilter.length}
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
                    lend_status: selectedLendingBook.status
                        ? selectedLendingBook.status
                        : lendingStatus[0].label,
                }}
                onSubmit={(values) => {
                    editBookLending(values);
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
                                Edit Book Lending
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
                                    name="due_date"
                                    label="Due date"
                                    placeholder="Type due date"
                                    type="date"
                                    errorMessage="Enter due date"
                                    validate={{ required: { value: true }, }}
                                    value={`${dayjs(selectedLendingBook.due_date).format(FORMAT.DATE)}`}
                                    onChange={handleChange}
                                />
                                <AvField
                                    name="return_date"
                                    label="Return date"
                                    placeholder="Type return date"
                                    type="date"
                                    errorMessage="Enter publish date"
                                    validate={{ required: { value: false }, }}
                                    value={selectedLendingBook.return_date ? `${dayjs(selectedLendingBook.return_date).format(FORMAT.DATE)}` : null}
                                    onChange={handleChange}
                                />
                                <AvField
                                    value={
                                        selectedLendingBook.status !== null
                                            ? selectedLendingBook.status
                                            : lendingStatus[0].label
                                    }
                                    type="select"
                                    name="lend_status"
                                    label="Status"
                                    onChange={handleChange} required>
                                    {
                                        lendingStatus.map(e => <option key={e.value}>{e.label}</option>)
                                    }
                                </AvField>
                                {/* <AvField
                                    name="fine_amount"
                                    label="Fine ($)"
                                    placeholder="Type fine amount"
                                    type="number"
                                    min={0}
                                    errorMessage="Enter fine amount"
                                    validate={{ required: { value: true } }}
                                    value={selectedLendingBook.fine_amount}
                                    onChange={handleChange}
                                /> */}
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
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDeleteBookLend}
                                data-dismiss="modal"
                            >
                                Delete this book lend
                            </button>
                        </div>
                    </Modal>
                )}
            </Formik>
        </>
    );
}

export default ManageBookLending;