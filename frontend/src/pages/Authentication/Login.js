import React, { Component } from 'react';

import { Row, Col, CardBody, Card, Alert } from "reactstrap";
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link, Redirect } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
    callSagaRequest,
    callSagaRequestWithErrorHandler
} from '../../utils/RequestHandler';
import {
    forgotPassword,
    loginWithEmail,
    loginWithFacebook
} from '../../../src/store/actions/auth';
import { updateAccessToken, updateRefreshToken, updateRole } from '../../utils/RequestSagaUtils/token/actions';
import { updateProfile } from '../../store/actions/user';
// actions
//import { loginUser,apiError } from '../../store/actions';

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

import { BASE_API_URL } from '../../constant';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: false,
            visible: false,
        }
        // handleValidSubmit
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    // handleValidSubmit
    async handleValidSubmit(event, values) {
        //this.props.loginUser(values, this.props.history);
        // await callSagaRequest(loginWithEmail, {
        //     email: values.email, password: values.password
        // });
        this.login(values.username, values.password);
    }

    login = (username, password) => {
        axios.post(`${BASE_API_URL}/auth/login`, {username, password})
            .then((response) => {
                if (response.status == 200) {
                    this.props.onUpdateAccessTokens(response.data);
                    this.props.onUpdateProfile({id: response.data.id, username});
                    this.props.onUpdateRole(response.data);
                    this.setState({ redirect: true })
                }
            })
            .catch(err => {
                this.setState({ error: true });
                this.setState({ visible: true }, () => {
                    window.setTimeout(() => {
                        this.setState({ visible: false })
                    }, 3000)
                });
            });
    }

    handleInputChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount() {
        //     this.props.apiError("");
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={'/dashboard'} />
            )
        }
        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark"><i className="fas fa-home h2"></i></Link>
                </div>
                <div className="account-pages my-5 pt-sm-5">
                    <div className="container">
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="overflow-hidden">
                                    <div className="bg-soft-primary">
                                        <Row>
                                            <Col className="col-7">
                                                <div className="text-primary p-4">
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p>Sign in to continue.</p>
                                                </div>
                                            </Col>
                                            <Col className="col-5 align-self-end">
                                                <img src={profile} alt="" className="img-fluid" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <CardBody className="pt-0">
                                        <div>
                                            <Link to="/">
                                                <div className="avatar-md profile-user-wid mb-4">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        <img src={logo} alt="" className="rounded-circle" height="34" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="p-2">

                                            <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>

                                                {this.state.error ? <Alert color="danger" isOpen={this.state.visible}>{'Username or password not correct!'}</Alert> : null}

                                                <div className="form-group">
                                                    <AvField name="username" label="Username" className="form-control" placeholder="Enter username" required onChange={this.handleInputChange} />
                                                </div>

                                                <div className="form-group">
                                                    <AvField name="password" label="Password" type="password" required placeholder="Enter Password" onChange={this.handleInputChange} />
                                                </div>

                                                {/* <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                                </div> */}

                                                <div className="mt-3">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Log In</button>
                                                </div>

                                                {/* <div className="mt-4 text-center">
                                                    <Link to="/forget-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i> Forgot your password?</Link>
                                                </div> */}
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p>Don't have an account ? <Link to="/register" className="font-weight-medium text-primary"> Signup now </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateAccessTokens: (token) => {
            dispatch(updateAccessToken(token));
        },
        onUpdateProfile: (profile) => {
            dispatch(updateProfile(profile));
        },
        onUpdateRole: (role) => {
            dispatch(updateRole(role));
        },
    }
}

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(Login);