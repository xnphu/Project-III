import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table } from "reactstrap";

import axios from 'axios';
import { BASE_API_URL, ROLE, ROLE_LABEL, FORMAT } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import dayjs from 'dayjs';
import { Formik } from 'formik';
import TablePagination from '../../components/CommonForBoth/TablePagination';
import SweetAlert from "react-bootstrap-sweetalert";
import { saveMember, editMember, deleteMember } from '../../store/actions/member';

const ManageMember = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const members = useSelector(state => state.member.members);

    const onSaveMember = member => dispatch(saveMember(member));
    const onEditMember = member => dispatch(editMember(member));
    const onDeleteMember = member => dispatch(deleteMember(member));

    const [isReloadData, setIsReloadData] = useState(false);

    const [role, setRole] = useState([
        { value: ROLE.ADMIN, label: ROLE_LABEL.ADMIN },
        { value: ROLE.LIBRARIAN, label: ROLE_LABEL.LIBRARIAN },
        { value: ROLE.MEMBER, label: ROLE_LABEL.MEMBER },
    ]);

    const MEMBER_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedMember, setSelectedMember] = useState({});

    const [modalVisibility, setModalVisibility] = useState(false);
    const [alert, setAlert] = useState(<></>);

    useEffect(() => {
        fetchListMember();
    }, []);

    const fetchListMember = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/members/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('members ', response.data);
            if (response.data) {
                var list = response.data;
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < role.length; j++) {
                        if (list[i].role === role[j].value) {
                            list[i].role = role[j].label;
                        }
                    }
                }
                onSaveMember({ members: list });
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    const editBookLending = async (value) => {
        try {
            console.log('editBookLending', value);
            // var statusFound = role.find((e) => e.label === value.lend_status || e.value === value.lend_status);
            // if (statusFound) {
            //     value.lend_status = statusFound.value;
            // }
            // var submitValue = { ...selectedMember };
            // submitValue.status = value.lend_status;
            // submitValue.fine_amount = value.fine_amount ? value.fine_amount : selectedMember.fine_amount;
            // submitValue.create_date = dayjs(selectedMember.create_date).format(FORMAT.DATETIME);
            // submitValue.due_date = dayjs(value.due_date ? value.due_date : selectedMember.due_date).format(FORMAT.DATE);
            // submitValue.return_date = value.return_date
            //     ? dayjs(value.return_date).format(FORMAT.DATE)
            //     : selectedMember.return_date
            //         ? dayjs(selectedMember.return_date).format(FORMAT.DATE)
            //         : null;

            // console.log('editBookLending', submitValue);

            // const response = await axios.put(`${BASE_API_URL}/book-lend/${selectedMember.id}`, submitValue, { headers: { Authorization: `Bearer ${token}` } });
            // console.log('res ', response.data);
            // if (response.data) {
            //     var editValue = response.data;

            //     // find index
            //     var list = members;
            //     const index = list.findIndex((e) => e.id === editValue.id);

            //     editValue.index = index;
            //     editValue.status = statusFound.label;
            //     onEditMember(editValue);
            //     setAlert(
            //         <SweetAlert
            //             success
            //             title="Edit member success!"
            //             onConfirm={() => {
            //                 setModalVisibility(false);
            //                 setAlert(<></>);
            //             }}
            //             onCancel={() => {
            //                 setModalVisibility(false);
            //                 setAlert(<></>);
            //             }}
            //         >
            //         </SweetAlert>
            //     );
            //     // setIsReloadData(!isReloadData);
            //     setModalVisibility(false);
            // }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Edit member fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                >
                </SweetAlert>
            );
        }
    }

    const handleDeleteMember = async () => {
        try {
            const response = await axios.delete(`${BASE_API_URL}/members/${selectedMember.id}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data.success) {
                onDeleteMember({ id: selectedMember.id });
                setModalVisibility(false);
                setAlert(
                    <SweetAlert
                        success
                        title="Delete member success!"
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
                    title="Delete member fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                ></SweetAlert>
            );
        }
    }

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const listMemberFilter = members.filter(e =>
        e.id ? e.id.toLowerCase().includes(searchKeywordLowerCase) : true ||
            e.name ? e.name.toLowerCase().includes(searchKeywordLowerCase) : true ||
                e.email ? e.email.toLowerCase().includes(searchKeywordLowerCase) : true ||
                    e.phone ? e.phone.toLowerCase().includes(searchKeywordLowerCase) : true
    );

    console.log('selectedMember  ', selectedMember);

    return (
        <>
            {alert}
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <CardTitle className="mt-4 float-sm-left">List of Member </CardTitle>
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
                                            <th scope="col">Username</th>
                                            <th scope="col">Contact Information</th>
                                            <th scope="col">Personal Information</th>
                                            <th scope="col">Account status</th>
                                            <th scope="col">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listMemberFilter
                                                .slice(
                                                    currentPage * MEMBER_PAGE_SIZE,
                                                    (currentPage + 1) * MEMBER_PAGE_SIZE
                                                )
                                                .map((e, i) =>
                                                    <tr
                                                        key={e.id}
                                                        onClick={() => {
                                                            setSelectedMember(e);
                                                            setModalVisibility(true);
                                                        }}>
                                                        <td>
                                                            <p className="text-muted mb-0">{e.id}</p>

                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.username}</p>
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
                                                                <div className="text-muted mb-0">
                                                                    {e.gender
                                                                        ? e.gender == 1
                                                                            ? 'Male'
                                                                            : 'Female'
                                                                        : ''}
                                                                </div>
                                                                <div className="text-muted mb-0">{e.date_of_birth ? dayjs(e.date_of_birth).format(FORMAT.DATE) : ''}</div>
                                                                <div className="text-muted mb-0">
                                                                    {
                                                                        e.street && e.city && e.country
                                                                            ? `${e.street}, ${e.city}, ${e.country}`
                                                                            : ''
                                                                    }</div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">
                                                                    {e.status
                                                                        ? e.status === 1 ? 'Active' : 'Disable'
                                                                        : 'Profile not found'
                                                                    }
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{e.role}</p>
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
                                        pageSize={MEMBER_PAGE_SIZE}
                                        length={listMemberFilter.length}
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
                    lend_status: selectedMember.status
                        ? selectedMember.status
                        : role[0].label,
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
                                    value={`${dayjs(selectedMember.due_date).format(FORMAT.DATE)}`}
                                    onChange={handleChange}
                                />
                                <AvField
                                    name="return_date"
                                    label="Return date"
                                    placeholder="Type return date"
                                    type="date"
                                    errorMessage="Enter publish date"
                                    validate={{ required: { value: false }, }}
                                    value={selectedMember.return_date ? `${dayjs(selectedMember.return_date).format(FORMAT.DATE)}` : null}
                                    onChange={handleChange}
                                />
                                <AvField
                                    value={
                                        selectedMember.status !== null
                                            ? selectedMember.status
                                            : role[0].label
                                    }
                                    type="select"
                                    name="lend_status"
                                    label="Status"
                                    onChange={handleChange} required>
                                    {
                                        role.map(e => <option key={e.value}>{e.label}</option>)
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
                                onClick={handleDeleteMember}
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

export default ManageMember;