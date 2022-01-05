import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";
import { Link } from "react-router-dom";

import avatarDummy from "../../assets/images/users/avatar-dummy.jpeg";

import axios from 'axios';
import { BASE_API_URL, BOOK_STATUS, BOOK_STATUS_LABEL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import dayjs from 'dayjs';
import { Formik } from 'formik';

const ManageBook = (props) => {
    console.log('asdasd ', props);
    const token = useSelector(state => state.token.token);
    const [authors, setAuthors] = useState([{ id: '22010001', label: 'Melissa Merz' }, { id: '22010002', label: 'Stephen E. Lucas' }]);
    const [locations, setLocations] = useState([{ id: '22010001', label: '101' }, { id: '22010002', label: '102' }, { id: '22010003', label: '103' }]);
    const [bookStatus, setBookStatus] = useState([
        { value: BOOK_STATUS.AVAILABLE, label: BOOK_STATUS_LABEL.AVAILABLE },
        { value: BOOK_STATUS.RESERVED, label: BOOK_STATUS_LABEL.RESERVED },
        { value: BOOK_STATUS.LOANED, label: BOOK_STATUS_LABEL.LOANED },
        { value: BOOK_STATUS.LOST, label: BOOK_STATUS_LABEL.LOST },
    ]);

    const [modalVisibility, setModalVisibility] = useState(false);


    const createNewBook = async (book) => {
        try {
            console.log('book ', book);
            var bookParam = book;
            bookParam.status = book.book_status;

            const response = await axios.post(`${BASE_API_URL}/books/`, bookParam, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                setModalVisibility(false);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    return (
        <>
            {/* Render Breadcrumb */}
            <Row>
                <Col xs="12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">Management</h4>
                    </div>
                </Col>
            </Row>

            {/* <Row>
                <Col xs="12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <label className="mb-0 font-size-14">Book</label>
                    </div>
                </Col>
            </Row> */}


            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <CardTitle className="mt-4 float-sm-left">List of Books </CardTitle>
                            <Row className="float-sm-right">

                                {/* {
                                images.map((image, key) => <img key={key} src={image} alt="" className="avatar-sm" />)
                            } */}
                                <div onClick={() => setModalVisibility(true)} className="btn btn-primary mt-3 mb-3 mr-4 d-lg-block float-sm-right">Add new book <i className="bx bx-plus"></i></div>
                                <Dropdown
                                    isOpen={false}
                                    toggle={() => { }
                                        // this.setState({ singlebtn: !this.state.singlebtn })
                                    }
                                    className="mt-3 mr-4 float-sm-left">
                                    <DropdownToggle className="btn btn-primary" caret>
                                        Lọc theo sắc thái{" "}
                                        <i className="mdi mdi-chevron-down"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Tích cực</DropdownItem>
                                        <DropdownItem>Trung tính</DropdownItem>
                                        <DropdownItem>Tiêu cực</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>


                                <form className="app-search d-none d-lg-block float-sm-right">
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm kiếm..."
                                        />
                                        <span className="bx bx-search-alt"></span>
                                    </div>
                                </form>
                            </Row>


                            <div className="table-responsive">
                                <Table className="table-centered table-nowrap table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" style={{ width: "70px" }}>ISBN</th>
                                            <th scope="col"></th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Author</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Pages</th>
                                            <th scope="col">Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.books.map((book, i) =>
                                                <tr key={book.id} >
                                                    <td>
                                                        <p className="text-muted mb-0">{book.isbn}</p>

                                                    </td>
                                                    <td>
                                                        {
                                                            book.previewUrl === ""
                                                                ? <div>
                                                                    <img src={avatarDummy} alt="" className="avatar-sm" />

                                                                </div>
                                                                : <div>
                                                                    <img src={book.previewUrl} alt="" className="avatar-sm" />

                                                                </div>
                                                        }

                                                    </td>
                                                    <td>
                                                        <div style={{ maxWidth: "200px", maxHeight: "100px" }}>
                                                            <h5 className="font-size-14 mb-1"><a href={`https://books.google.com/books?isbn=${book.isbn}`} target="_blank" className="text-dark">{book.title}</a></h5>
                                                            <p className="text-muted mb-0" style={{ whiteSpace: "pre-wrap" }}>{book.publisher}</p>
                                                            <p className="text-muted mb-0" style={{ whiteSpace: "pre-wrap" }}>{book.subject}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <p className="text-muted mb-0">{book.author_name}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <p className="text-muted mb-0">{book.language}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <p className="text-muted mb-0">{book.number_of_pages}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <p className="text-muted mb-0">{book.status}</p>
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
                                    <Pagination className="pagination pagination-rounded justify-content-center mt-4">
                                        <PaginationItem disabled>
                                            <PaginationLink previous href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink href="#">
                                                2
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                4
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                5
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink next href="#" />
                                        </PaginationItem>
                                    </Pagination>
                                </Col>
                            </Row>


                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Formik
                initialValues={{
                    isbn: 0,
                    price: 0,
                    title: '',
                    author_id: '22010001',
                    rack_id: '22010001',
                    subject: '',
                    publisher: '',
                    publish_date: `${dayjs(Date.now()).format('YYYY-MM-DD')}`,
                    date_purchase: `${dayjs(Date.now()).format('YYYY-MM-DD')}`,
                    number_of_pages: 0,
                    description: '',
                    book_status: BOOK_STATUS.AVAILABLE,
                    language: 'English'
                }}
                onSubmit={(values) => {
                    createNewBook(values);
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    // }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
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
                                Add new book
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
                                    name="isbn"
                                    label="ISBN"
                                    placeholder="Type ISBN"
                                    type="number"
                                    min={0}
                                    errorMessage="Enter ISBN"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />
                                <AvField
                                    name="title"
                                    label="Title"
                                    placeholder="Type title"
                                    type="text"
                                    errorMessage="Enter title"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />
                                <AvField
                                    name="subject"
                                    label="Subject"
                                    placeholder="Type subject"
                                    type="text"
                                    errorMessage="Enter subject"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />
                                <AvField type="select" name="author" label="Author" onChange={handleChange} required>
                                    {
                                        authors.map((author) => <option key={author.id}>{author.label}</option>)
                                    }
                                </AvField>

                                <Row className="form-group d-flex justify-content-between">
                                    <Col xs={12} md={6} lg={6}>
                                        <AvField
                                            name="publisher"
                                            label="Publisher"
                                            placeholder="Type publisher"
                                            type="text"
                                            errorMessage="Enter publisher"
                                            validate={{ required: { value: true } }}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={12} md={3} lg={3}>
                                        <AvField
                                            // defaultValue={dayjs(Date.now()).format('YYYY-MM-DD')}
                                            name="publish_date"
                                            label="Publish date"
                                            placeholder="Type publish date"
                                            type="date"
                                            errorMessage="Enter publish date"
                                            validate={{ required: { value: true }, }}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={12} md={3} lg={3}>
                                        <AvField
                                            name="number_of_pages"
                                            label="Number of pages"
                                            placeholder="Type num of pages"
                                            type="number"
                                            min={0}
                                            errorMessage="Enter number of pages"
                                            validate={{ required: { value: true } }}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>

                                <AvField
                                    style={{ maxHeight: '100px', height: '100px' }}
                                    name="description"
                                    label="Description"
                                    placeholder="Type description"
                                    type="textarea"
                                    errorMessage="Enter description"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />
                                <Row className="form-group d-flex justify-content-between">
                                    <Col xs={12} md={6} lg={6}>
                                        <AvField type="select" name="location" label="Location" onChange={handleChange} required>
                                            {
                                                locations.map((author) => <option key={author.id}>{author.label}</option>)
                                            }
                                        </AvField>
                                    </Col>
                                    <Col xs={12} md={6} lg={6}>
                                        <AvField type="select" name="book_status" label="Status" placeholder="Status" onChange={handleChange} required>
                                            {
                                                bookStatus.map((status) => <option key={status.value}>{status.label}</option>)
                                            }
                                        </AvField>
                                    </Col>
                                </Row>

                                <Row className="form-group d-flex justify-content-between">
                                    <Col xs={12} md={4} lg={4}>
                                        <AvField
                                            name="language"
                                            label="Language"
                                            placeholder="Type language"
                                            type="text"
                                            errorMessage="Enter language"
                                            validate={{ required: { value: true } }}
                                            onChange={handleChange}
                                        />

                                    </Col>
                                    <Col xs={12} md={4} lg={4}>
                                        <AvField
                                            name="date_purchase"
                                            label="Purchase date"
                                            placeholder="Type purchase date"
                                            type="date"
                                            errorMessage="Enter purchase date"
                                            validate={{}}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={12} md={4} lg={4}>
                                        <AvField
                                            name="price"
                                            label="Price"
                                            placeholder="Type price"
                                            type="number"
                                            min={0}
                                            errorMessage="Enter price"
                                            validate={{ required: { value: true } }}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
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

export default ManageBook;