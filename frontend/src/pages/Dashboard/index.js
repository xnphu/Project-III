import React, { Component } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle,  Media, Table, CardSubtitle, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Pagination, PaginationItem, PaginationLink,  Dropdown, ButtonDropdown } from "reactstrap";
import { Link } from "react-router-dom";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
import Doughnut from "../AllCharts/echart/doughnutchart";
import BarChartToast from "../AllCharts/toastui/BarChartToast";

//import Tables
// import { MDBDataTable } from "mdbreact";

// import modalimage1 from "../../assets/images/product/img-7.png";
// import modalimage2 from "../../assets/images/product/img-4.png";

import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";


// Pages Components
// import WelcomeComp from "./WelcomeComp";
// import MonthlyEarning from "./MonthlyEarning";
// import SocialSource from "./SocialSource";
// import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
// import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
// import Breadcrumbs from '../../components/Common/Breadcrumb';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [
                { title: "BÁO CHÍNH THỐNG", iconClass: "mdi mdi-office-building", description: "234", extra:"10" },
                { title: "BÁO ĐỊA PHƯƠNG", iconClass: "mdi mdi-newspaper-variant-multiple-outline", description: "125", extra:"10" },
                { title: "WEBSITE/BLOGS", iconClass: "mdi mdi-earth", description: "212", extra:"10" },
                { title: "MXH FACEBOOK", iconClass: "mdi mdi-facebook-box", description: "314", extra:"10" }
            ],
            email: [
                { title: "6h", linkto: "#", isActive: true },
                { title: "12h", linkto: "#", isActive: false },
                { title: "24h", linkto: "#", isActive: false },
                { title: "48h", linkto: "#", isActive: false }
            ],

            users: [
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
            ],
            modal: false
        };
        this.togglemodal.bind(this);
    }

    togglemodal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {


       
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                <Row>
                    <Col xs="12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">Tổng quan tin tức</h4>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                            <label className="mb-0 font-size-14">Cập nhật thông tin chính thống 24/7</label>
                        </div>
                    </Col>
                </Row>

                        <Row>
                            <Col xl="12">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        this.state.reports.map((report, key) =>
                                            <Col md="3" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0" style={{ color: "#3E34FF" }}>{report.description}</h4>
                                                                <label style={{ color: "#29CE8B" }}>+{report.extra} Tin mới</label>
                                                            </Media>
                                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                                <span className="avatar-title">
                                                                    <i className={"bx " + report.iconClass + " font-size-24"}></i>
                                                                </span>
                                                            </div>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>


                            </Col>
                        </Row>

                        
                        <Row>
                            <Col xl="8">

                            <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4 float-sm-left">
                                            Tin trong ngày
                                        </CardTitle>
                                        <div className="float-sm-right">
                                            <ul className="nav nav-pills">
                                                {
                                                    this.state.email.map((mail, key) =>
                                                        <li className="nav-item" key={"_li_" + key}>
                                                            <Link className={mail.isActive ? "nav-link active" : "nav-link"} to={mail.linkto}>{mail.title}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                        <StackedColumnChart />
                                    </CardBody>
                                </Card>         

                            </Col>

                            <Col xl="4">
                            <Card>
                                    <CardBody>
                                        <CardTitle>Thống kê theo sắc thái</CardTitle>
                                        <div id="doughnut-chart" className="e-chart">
                                        <Doughnut />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        
                        </Row>

                        <Row>
                            <Col lg="7">
                            <Card>
                                <CardBody>
                                        <CardTitle className="mt-1 float-sm-left"><i className="mdi mdi-file-document" style={{ color: '#236AEA' }}></i>  Tin nổi bật trong 6 giờ qua </CardTitle>
                                        <div className="float-sm-right">
                                            <ul className="nav nav-pills">
                                                {
                                                    this.state.email.map((mail, key) =>
                                                        <li className="nav-item" key={"_li_" + key}>
                                                            <Link className={mail.isActive ? "nav-link active" : "nav-link"} to={mail.linkto}>{mail.title}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                        <form className="app-search d-none d-lg-block">
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Tìm kiếm..."
                                                    />
                                                    <span className="bx bx-search-alt"></span>
                                                </div>
                                        </form>
                                        
                                        <Row>
                            <Col lg="12">
                                <div className="">
                                    <div className="table-responsive">
                                        <Table className="project-list-table table-nowrap table-centered table-borderless">
                                            <thead>
                                                {/* <tr>
                                                    <th scope="col" style={{ width: "100px" }}>#</th>
                                                    <th scope="col">Projects</th>
                                                    <th scope="col">Due Date</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Team</th>
                                                    <th scope="col">Action</th>
                                                </tr> */}
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td>                                                      
                                                        <p className="mb-0" style={{ color: "#3E34FF" }}>#Đại dịch covid</p>
                                                        <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">Hàng chục thủy thủ trên du thuyền italy ở Nhật Bản mắc COVID-19</Link></h5>
                                                    </td>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td><i className="bx bx-time"></i> 1 giờ trước</td>
                                                    
                                                    
                                                </tr>
                                                <tr>
                                                    <td><img src={img2} alt="" className="avatar-sm" /></td>
                                                    <td>
                                                        <p className="mb-0" style={{ color: "#3E34FF" }}>#Đại dịch covid</p>
                                                        <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">Hàng chục thủy thủ trên du thuyền italy ở Nhật Bản mắc COVID-19</Link></h5>
                                                    </td>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td><i className="bx bx-time"></i> 1 giờ trước</td>
                                                    
                                                    
                                                </tr>
                                                <tr>
                                                    <td><img src={img3} alt="" className="avatar-sm" /></td>
                                                    <td>
                                                        <p className="mb-0" style={{ color: "#3E34FF" }}>#Đại dịch covid</p>
                                                        <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">Hàng chục thủy thủ trên du thuyền italy ở Nhật Bản mắc COVID-19</Link></h5>
                                                    </td>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td><i className="bx bx-time"></i> 1 giờ trước</td>
                                                    
                                                    
                                                </tr>

                                                <tr>
                                                    <td><img src={img4} alt="" className="avatar-sm" /></td>
                                                    <td>
                                                        <p className="mb-0" style={{ color: "#3E34FF" }}>#Đại dịch covid</p>
                                                        <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">Hàng chục thủy thủ trên du thuyền italy ở Nhật Bản mắc COVID-19</Link></h5>
                                                    </td>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td><i className="bx bx-time"></i> 1 giờ trước</td>
                                                    
                                                    
                                                </tr>
                                                <tr>
                                                    <td><img src={img5} alt="" className="avatar-sm" /></td>
                                                    <td>
                                                        <p className="mb-0" style={{ color: "#3E34FF" }}>#Đại dịch covid</p>
                                                        <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">Hàng chục thủy thủ trên du thuyền italy ở Nhật Bản mắc COVID-19</Link></h5>
                                                    </td>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td><i className="bx bx-time"></i> 1 giờ trước</td>
                                                    
                                                    
                                                </tr>
                                                <tr>
                                                    <td><img src={img6} alt="" className="avatar-sm" /></td>
                                                    <td>
                                                        <p className="mb-0" style={{ color: "#3E34FF" }}>#Đại dịch covid</p>
                                                        <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">Hàng chục thủy thủ trên du thuyền italy ở Nhật Bản mắc COVID-19</Link></h5>
                                                    </td>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td><i className="bx bx-time"></i> 1 giờ trước</td>
                                                    
                                                    
                                                </tr>

                                                <tr>
                                                    <td><img src={img3} alt="" className="avatar-sm" /></td>
                                                    <td>
                                                        <p className="mb-0" style={{ color: "#3E34FF" }}>#Đại dịch covid</p>
                                                        <h5 className="text-truncate font-size-14"><Link to="#" className="text-dark">Hàng chục thủy thủ trên du thuyền italy ở Nhật Bản mắc COVID-19</Link></h5>
                                                    </td>
                                                    <td><img src={img1} alt="" className="avatar-sm" /></td>
                                                    <td><i className="bx bx-time"></i> 1 giờ trước</td>
                                                
                                                    
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12">
                                <div className="text-center my-3">
                                    <Link to="#" className="text-success"><i className="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i> Xem tất cả </Link>
                                </div>
                            </Col>
                        </Row>
                                        
                                </CardBody>
                            </Card>
                            </Col>
                            <Col xl="5">
                            <Card>
									<CardBody>
                                    <CardTitle className="mt-1 float-sm-left"><i className="mdi mdi-star-box" style={{ color: '#FCC75F' }}></i>  Chủ đề nổi bật </CardTitle>
                                        <div className="float-sm-right">
                                            <ul className="nav nav-pills">
                                                {
                                                    this.state.email.map((mail, key) =>
                                                        <li className="nav-item" key={"_li_" + key}>
                                                            <Link className={mail.isActive ? "nav-link active" : "nav-link"} to={mail.linkto}>{mail.title}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                        <label className="mt-4 float-sm-left">Cập nhật lúc 29/04/2020 16:50</label>
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
                                        <div className="clearfix"></div>
										<TopCities />
									</CardBody>
								</Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="12">
                            <Card>
                                <CardBody>
                                        <CardTitle className="mt-4 float-sm-left">Tin mới gần đây </CardTitle>
                                        <div className="float-sm-right">
                                            

                                        
                                            <Dropdown
                                            isOpen={this.state.singlebtn}
                                            toggle={() =>
                                                this.setState({ singlebtn: !this.state.singlebtn })
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
                                                        this.state.users.map((user, i) =>
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
                    </Container>
                </div>
                
            </React.Fragment>
        );
    }
}

export default Dashboard;
