import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";

import avatarDummy from "../../assets/images/users/avatar-dummy.jpeg";

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import dayjs from 'dayjs';
import { Formik } from 'formik';
import TablePagination from '../../components/CommonForBoth/TablePagination';
import { saveAuthor } from '../../store/actions/author';

const ManageAuthor = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const authors = useSelector(state => state.author.authors);

    const saveAuthor = author => dispatch(saveAuthor(author));

    const [selectedAuthor, setSelectedAuthor] = useState({});

    const AUTHOR_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [searchKeyword, setSearchKeyword] = useState('');

    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalCreateVisibility, setModalCreateVisibility] = useState(false);

    // useEffect(() => {
    //     fetchAllAuthors();
    // }, []);

    // const fetchAllAuthors = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_API_URL}/authors/`, { headers: { Authorization: `Bearer ${token}` } });
    //         console.log('authors ', response.data);
    //         if (response.data) {
    //             saveAuthor({ authors: response.data, total: response.data.length });
    //         }
    //     } catch (error) {
    //         console.log('err ', error);
    //     }
    // }

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const authorsFilter = authors.filter(author => author.name.toLowerCase().includes(searchKeywordLowerCase));

    const createNewAuthor = async (author) => {
        try {
            console.log('author ', author);

            const response = await axios.post(`${BASE_API_URL}/authors/`, author, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                var newAuthor = response.data;
                var list = authors;
                list.push(newAuthor);
                saveAuthor({ authors: list, total: list.length });
                setModalCreateVisibility(false);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    return (
        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <CardTitle className="mt-4 float-sm-left">List of Authors </CardTitle>
                            <Row className="float-sm-right">
                                <div onClick={() => setModalCreateVisibility(true)} className="btn btn-primary mt-3 mb-3 mr-4 d-lg-block float-sm-right">Add new author <i className="bx bx-plus"></i></div>
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
                                            <th scope="col">Author name</th>
                                            <th scope="col">Description</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            authorsFilter
                                                .slice(
                                                    currentPage * AUTHOR_PAGE_SIZE,
                                                    (currentPage + 1) * AUTHOR_PAGE_SIZE
                                                )
                                                .map((author, i) =>
                                                    <tr
                                                        key={author.id}
                                                        onClick={() => {
                                                            setSelectedAuthor(author);
                                                            setModalVisibility(true);
                                                        }}>
                                                        <td>
                                                            <p className="text-muted mb-0">{author.id}</p>

                                                        </td>
                                                        <td>
                                                            <div>
                                                                <p className="text-muted mb-0">{author.name}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                style={{ height: "80px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                                            >
                                                                <p className="text-muted mb-0" style={{ whiteSpace: "pre-wrap" }}>{author.description}</p>
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
                                        pageSize={AUTHOR_PAGE_SIZE}
                                        length={authorsFilter.length}
                                        currentPage={currentPage}
                                        handleClickPage={handleClickPage}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
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
                        Author Information Detail
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
                    <div className="mb-3"><b>Author name: </b> {selectedAuthor?.name}</div>
                    <div className="mb-3"><b>Description: </b> {selectedAuthor?.description}</div>
                </div>
            </Modal>
            <Modal
                className="modal-lg"
                scrollable={true}
                isOpen={modalCreateVisibility}
                toggle={() => setModalCreateVisibility(!modalCreateVisibility)}
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="myLargeModalLabel"
                    >
                        Create new author
                    </h5>
                    <button
                        onClick={() =>
                            setModalCreateVisibility(false)
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
                    <div className="mb-3"><b>Author name: </b> </div>
                    <div className="mb-3"><b>Description: </b> </div>
                </div>
            </Modal>
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                }}
                onSubmit={(values) => {
                    createNewAuthor(values);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Modal
                        className="modal-lg"
                        scrollable={true}
                        isOpen={modalCreateVisibility}
                        toggle={() => setModalCreateVisibility(!modalCreateVisibility)}
                    >
                        <div className="modal-header">
                            <h5
                                className="modal-title mt-0"
                                id="myLargeModalLabel"
                            >
                                Create new author
                            </h5>
                            <button
                                onClick={() =>
                                    setModalCreateVisibility(false)
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
                                    name="name"
                                    label="Author name"
                                    placeholder="Type author name"
                                    type="text"
                                    errorMessage="Enter author name"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />

                                <AvField
                                    style={{ maxHeight: '100px', height: '200px' }}
                                    name="description"
                                    label="Description"
                                    placeholder="Type description"
                                    type="textarea"
                                    errorMessage="Enter description"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />
                            </AvForm>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}>
                                Save changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    setModalCreateVisibility(false)
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

export default ManageAuthor;