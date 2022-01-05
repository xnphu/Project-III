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
import ManageBook from "./ManageBook";

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
                        : <ManageBook users={users} />
                }
            </Container>
        </div>

    );
}



export default Admin;