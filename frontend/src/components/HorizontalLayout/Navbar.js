import React, { Component } from "react";
import {  Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from 'redux';
// import classname from "classnames";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div className="topnav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                            <Collapse isOpen={this.props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link" to="/dashboard">
                                            <i className="bx bx-home-circle mr-2"></i>Home {this.props.menuOpen}
                                        </Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link" to="/feedback">
                                            <i className="bx bx-home-circle mr-2"></i>Feedback {this.props.menuOpen}
                                        </Link>
                                    </li>

                                    {/*<li className="nav-item dropdown">
                                        <Link className="nav-link" to="/library-card-request">
                                            <i className="bx bx-home-circle mr-2"></i>Request Library Card {this.props.menuOpen}
                                        </Link>
                                    </li> */}

                                    {
                                        this.props.role === 0 || this.props.role === 1 
                                            ? <li className="nav-item dropdown">
                                                <Link className="nav-link" to="/admin">
                                                    <i className="bx bx-home-circle mr-2"></i>Management {this.props.menuOpen}
                                                </Link>
                                            </li>
                                            : <></>
                                    }

                                    {/* <li className="nav-item dropdown">
                                        <Link className="nav-link" to="dashboard">
                                            <i className="bx bx-home-circle mr-2"></i>Cấu hình {this.props.menuOpen}
                                        </Link>
                                    </li> */}
                                </ul>
                            </Collapse>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
	const { role } = state.token;
	return {
		role: role
	};
};

export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(Navbar);
