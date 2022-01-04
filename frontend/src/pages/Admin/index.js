import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";
import { Link } from "react-router-dom";

import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";

import Pages401 from "../Utility/pages-401";
import axios from 'axios';
import { BASE_API_URL, BOOK_STATUS, BOOK_STATUS_LABEL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import dayjs from 'dayjs';

const Admin = () => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.token.role);

    const [users, setUsers] = useState([
        {
            id: 1, img: "Null", name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "UI/UX Designer", email: "david@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Photoshop" },
                { name: "illustrator" }
            ]
        },
        {
            id: 2, img: img4, name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "Frontend Developer", email: "frank@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Html" },
                { name: "Css" },
                { name: "2 + more" },
            ]
        },
        {
            id: 3, img: img4, name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "Backend Developer", email: "Rafael@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Php" },
                { name: "Java" },
                { name: "Python" },
            ]
        },
        {
            id: 4, img: "Null", name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "Full Stack Developer", email: "mark@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Ruby" },
                { name: "Php" },
                { name: "2 + more" },
            ]
        },
        {
            id: 5, img: img4, name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "Frontend Developer", email: "minnie@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Html" },
                { name: "Css" },
                { name: "2 + more" },
            ]
        },
        {
            id: 6, img: img4, name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "UI/UX Designer", email: "shirley@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Photoshop" },
                { name: "UI/UX Designer" }
            ]
        },
        {
            id: 7, img: "Null", name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "Full Stack Developer", email: "john@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Ruby" },
                { name: "Php" },
                { name: "2 + more" },
            ]
        },
        {
            id: 8, img: img4, name: "Hàng chục thủy thủy trên thuyền italy nhiễm Covid-19", designation: "Backend Developer", email: "colin@skote.com", projects: "1 giờ trước",
            skills: [
                { name: "Php" },
                { name: "Java" },
                { name: "Python" },
            ]
        },
    ]);

    return (
        <div className="page-content">
            <Container fluid>
                {
                    (role != 0 && role != 1)
                        ? <Pages401 />
                        : <AdminBody users={users} />
                }
            </Container>
        </div>

    );
}

const AdminBody = (props) => {
    console.log('asdasd ', props);
    const [authors, setAuthors] = useState(['Something', 'Something else', 'Florida', 'This is just an exmaple', 'Not Florida']);
    const [locations, setLocations] = useState([{ id: 101, label: '101' }, { id: 102, label: '102' }, { id: 103, label: '103' }]);
    const [bookStatus, setBookStatus] = useState([
        { value: BOOK_STATUS.AVAILABLE, label: BOOK_STATUS_LABEL.AVAILABLE },
        { value: BOOK_STATUS.RESERVED, label: BOOK_STATUS_LABEL.RESERVED },
        { value: BOOK_STATUS.LOANED, label: BOOK_STATUS_LABEL.LOANED },
        { value: BOOK_STATUS.LOST, label: BOOK_STATUS_LABEL.LOST },
    ]);
    const [modalVisibility, setModalVisibility] = useState(false);

    const handleValidSubmit = (event, values) => {
        console.log(`event ${event} === value ${values}`);
    }

    useEffect(() => {

    });

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
                                            <th scope="col" style={{ width: "70px" }}>Updated at</th>
                                            <th scope="col"></th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Author</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.users.map((user, i) =>
                                                <tr key={"_user_" + i} >
                                                    <td>
                                                        <p className="text-muted mb-0">{user.projects}</p>

                                                    </td>
                                                    <td>
                                                        {
                                                            user.img === "Null"
                                                                ? <div>
                                                                    <img src={img3} alt="" className="avatar-sm" />

                                                                </div>
                                                                : <div>
                                                                    <img src={img3} alt="" className="avatar-sm" />

                                                                </div>
                                                        }

                                                    </td>
                                                    <td>
                                                        <h5 className="font-size-14 mb-1"><Link to="#" className="text-dark">{user.name}</Link></h5>
                                                        <p className="text-muted mb-0">{user.designation}</p>
                                                    </td>
                                                    <td>
                                                        {
                                                            user.img === "Null"
                                                                ? <div>
                                                                    <img src={img3} alt="" className="avatar-sm" />

                                                                </div>
                                                                : <div>
                                                                    <img src={img3} alt="" className="avatar-sm" />

                                                                </div>
                                                        }

                                                    </td>
                                                    <td>

                                                        <div>
                                                            {
                                                                user.skills.map((skill, key) =>
                                                                    <p key={key} className="mb-0" style={{ color: "#3E34FF" }}>#{skill.name}</p>
                                                                )
                                                            }

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            {
                                                                user.skills.map((skill, key) =>
                                                                    <Link to="#" className="badge badge-soft-primary font-size-11 m-1" key={"_skill_" + key}>{skill.name}</Link>
                                                                )
                                                            }

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span className="bx bx-edit-alt"></span>
                                                            <span className="bx bx-trash-alt"></span>

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
                    <AvForm onValidSubmit={handleValidSubmit}>
                        <AvField
                            name="isbn"
                            label="ISBN"
                            placeholder="Type ISBN"
                            type="text"
                            errorMessage="Enter ISBN"
                            validate={{ required: { value: true } }}
                        />
                        <AvField
                            name="title"
                            label="Title"
                            placeholder="Type title"
                            type="text"
                            errorMessage="Enter title"
                            validate={{ required: { value: true } }}
                        />
                        <AvField type="select" name="author" label="Author" required>
                            {
                                authors.map((author, key) => <option key={key}>{author}</option>)
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
                                />
                            </Col>
                            <Col xs={12} md={3} lg={3}>
                                <AvField
                                    name="number_of_pages"
                                    label="Number of pages"
                                    placeholder="Type num of pages"
                                    type="number"
                                    errorMessage="Enter number of pages"
                                    validate={{ required: { value: true }, pattern: {value: /^\d+$/} }}
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
                        />
                        <AvField type="select" name="location" label="Location" required>
                            {
                                locations.map((author) => <option key={author.id}>{author.label}</option>)
                            }
                        </AvField>

                        <Row className="form-group d-flex justify-content-between">
                            <Col xs={12} md={4} lg={4}>
                                <AvField type="select" name="book_status" label="Status" placeholder="Status" required>
                                    {
                                        bookStatus.map((status) => <option key={status.value}>{status.label}</option>)
                                    }
                                </AvField>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <AvField
                                    name="borrow_date"
                                    label="Borrow date"
                                    placeholder="Type borrow date"
                                    type="date"
                                    errorMessage="Enter borrow date"
                                    validate={{}}
                                />
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <AvField
                                    name="due_date"
                                    label="Due date"
                                    placeholder="Type due date"
                                    type="date"
                                    errorMessage="Enter due date"
                                    validate={{}}
                                />
                            </Col>
                        </Row>

                        <AvField
                            name="language"
                            label="Language"
                            placeholder="Type language"
                            type="text"
                            errorMessage="Enter language"
                            validate={{ required: { value: true } }}
                        />
                    </AvForm>
                </div>
                <div className="modal-footer">
                    <button 
                    type="submit" 
                    className="btn btn-primary" 
                    onClick={(event, values) =>{
                        console.log(`event ${event} === value ${values}`);
                    }
                            
                        }>
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
        </>
    );
}

export default Admin;