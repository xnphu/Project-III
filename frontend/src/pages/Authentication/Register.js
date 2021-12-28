import React, { Component } from "react";
import { Row, Col, CardBody, Card, Alert } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
//import { registerUser,apiError,registerUserFailed } from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

import axios from 'axios';
import { toast } from 'react-toastify';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: false,
      success: false,
      errorMsg: '',
      visible: false,
    };

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  async handleValidSubmit(event, values) {
    if (values.password == values.rePassword) {
      axios.post('http://localhost:8080/auth/signUp', {
        username: values.username, password: values.password, rePassword: values.rePassword, role: 2
      })
        .then((response) => {
          if (response.status == 200) {
            this.setState({ redirect: true, success: true })
          }
        })
        .catch(err => {
          this.setState({ error: true, errorMsg: err.message });
          this.setState({ visible: true }, () => {
            window.setTimeout(() => {
              this.setState({ visible: false })
            }, 3000)
          });
        });
    } else {
      this.setState({ error: true });
      this.setState({ errorMsg: 'Password not match!' });
      this.setState({ visible: true }, () => {
        window.setTimeout(() => {
          this.setState({ visible: false })
        }, 3000)
      });
    }
  }
  handleInputChange = async (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    // this.props.apiError("");
    // this.props.registerUserFailed("");
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={'/login'} />
      )
    }
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
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
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.handleValidSubmit}
                      >
                        {this.state.error ? <Alert color="danger" isOpen={this.state.visible}>{this.state.errorMsg}</Alert> : null}

                        <div className="form-group">
                          <AvField
                            name="username"
                            label="Username"
                            type="text"
                            required
                            placeholder="Enter username"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <Row className="form-group">
                          <Col>
                            <AvField
                              name="password"
                              label="Password"
                              type="password"
                              required
                              placeholder="Enter Password"
                              onChange={this.handleInputChange}
                            />
                          </Col>
                          <Col>
                            <AvField
                              name="rePassword"
                              label="Confirm password"
                              type="password"
                              required
                              placeholder="Enter Password"
                              onChange={this.handleInputChange}
                            />
                          </Col>
                        </Row>

                        <div className="mt-4">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            By registering you agree to the {" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link
                      to="/login"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default
  // (
  // //mapStatetoProps
  // //  , { registerUser,apiError,registerUserFailed }
  // )
  (Register);
