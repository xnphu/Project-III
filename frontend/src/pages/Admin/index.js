import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Media, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink, Dropdown, ButtonDropdown } from "reactstrap";
import { Link } from "react-router-dom";

import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";

import Pages401 from "../Utility/pages-401";
import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';

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
                        : <AdminBody users = {users} />
                }
            </Container>
        </div>

    );
}

const AdminBody = (props) => {
    console.log('asdasd ', props);
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
                            <div className="float-sm-right">

                                <Dropdown
                                    isOpen={false}
                                    toggle={() => {}
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
                            </div>


                            <div className="table-responsive">
                                <Table className="table-centered table-nowrap table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" style={{ width: "70px" }}>Cập nhật</th>
                                            <th scope="col"></th>
                                            <th scope="col">Tin bài</th>
                                            <th scope="col">Nguồn tin</th>
                                            <th scope="col">Danh mục</th>
                                            <th scope="col">Từ khóa</th>

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
        </>
    );
}

export default Admin;