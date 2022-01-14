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
import SweetAlert from "react-bootstrap-sweetalert";

const ManageLibraryCard = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const [listLibraryCard, setListLibraryCard] = useState([]);
    const [isReloadData, setIsReloadData] = useState(false);

    const [libraryCardStatus, setLibraryCardStatus] = useState([
        { value: 0, label: 'Not active' },
        { value: 1, label: 'Active' },
    ]);

    const LIBRARY_CARD_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedLibraryCard, setSelectedLibraryCard] = useState({});

    const [modalVisibility, setModalVisibility] = useState(false);
    const [alert, setAlert] = useState(<></>);

    useEffect(() => {
        fetchListBookReservation();
    }, [isReloadData]);

    const fetchListBookReservation = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/library-card/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('library-card ', response.data);
            if (response.data) {
                setListLibraryCard(response.data);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    const editLibraryCard = async (value) => {
        try {
            var statusFound = libraryCardStatus.find((e) => e.label === value.active_flg || e.value === value.active_flg);
            if (statusFound != undefined) {
                value.active_flg = statusFound.value;
            }
            if (value.issue_date == '') {
                value.issue_date = selectedLibraryCard.issue_date;
            }
            value.member_id = selectedLibraryCard.member_id;
            console.log('editLibraryCard  ', value);

            const response = await axios.put(`${BASE_API_URL}/library-card/${selectedLibraryCard.id}`, value, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                setAlert(
                    <SweetAlert
                        success
                        title="Edit library card success!"
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
                setIsReloadData(true);
            }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Edit library card fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                >
                </SweetAlert>
            );
        }
    }

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const listBookReservationFilter = listLibraryCard.filter(e => e.name.toLowerCase().includes(searchKeywordLowerCase));

    return (
        <>
            {alert}
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <CardTitle className="mt-4 float-sm-left">List of Library Card </CardTitle>
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
                                            <th scope="col">Member info</th>
                                            <th scope="col">Issue date</th>
                                            <th scope="col">Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listBookReservationFilter
                                                .slice(
                                                    currentPage * LIBRARY_CARD_PAGE_SIZE,
                                                    (currentPage + 1) * LIBRARY_CARD_PAGE_SIZE
                                                )
                                                .map((e, i) =>
                                                    <tr
                                                        key={e.id}
                                                        onClick={() => {
                                                            setSelectedLibraryCard(e);
                                                            setModalVisibility(true);
                                                        }}>
                                                        <td>
                                                            <p className="text-muted mb-0">{e.id}</p>

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
                                                                <p className="text-muted mb-0">{dayjs(e.issue_date).format(FORMAT.DATE)}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.active_flg == 1 ? 'Active' : 'Not active'}</p>
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
                                        pageSize={LIBRARY_CARD_PAGE_SIZE}
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
                    active_flg: selectedLibraryCard.active_flg !== undefined
                        ? selectedLibraryCard.active_flg === 1
                            ? libraryCardStatus[1].label
                            : libraryCardStatus[0].label
                        : libraryCardStatus[0].label,
                    issue_date: selectedLibraryCard.issue_date !== undefined ? selectedLibraryCard.issue_date : '',
                }}
                onSubmit={(values) => {
                    editLibraryCard(values);
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                }) => (
                    <Modal
                        className="modal-lg"
                        scrollable={true}
                        isOpen={modalVisibility}
                        toggle={() => setModalVisibility(!modalVisibility)}
                    >
                        <div className="modal-header">
                            <h5
                                className="modal-title mt-0"
                                id="myLargeModalLabel"
                            >
                                Edit Library Card {selectedLibraryCard.active_flg != undefined
                                    ? `${selectedLibraryCard.active_flg}`
                                    : libraryCardStatus[1].value}
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
                                    value={selectedLibraryCard.issue_date != undefined ? selectedLibraryCard.issue_date : ''}
                                    name="issue_date"
                                    label="Issue date"
                                    placeholder="Type issue date"
                                    type="date"
                                    errorMessage="Enter issue date"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />
                                <AvField
                                    value={
                                        selectedLibraryCard.active_flg !== undefined
                                            ? selectedLibraryCard.active_flg === 1
                                                ? libraryCardStatus[1].label
                                                : libraryCardStatus[0].label
                                            : libraryCardStatus[0].label
                                    }
                                    type="select"
                                    name="active_flg"
                                    label="Status"
                                    onChange={handleChange} required>
                                    {
                                        libraryCardStatus.map(e => <option key={e.value}>{e.label}</option>)
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

export default ManageLibraryCard;