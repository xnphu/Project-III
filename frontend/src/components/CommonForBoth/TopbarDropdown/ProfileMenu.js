
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

// users
import user1 from '../../../assets/images/users/avatar-dummy.jpeg';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
                    <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                        <img className="rounded-circle header-profile-user" src={user1} alt="Header Avatar" />
                        <span className="d-none d-xl-inline-block ml-2 mr-1">{this.props.username}</span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <Link to={`/profile/${this.props.userId}`} className="dropdown-item">
                            <i className="bx bx-user font-size-16 align-middle mr-1">
                            </i>Tài khoản
                        </Link>
                        {/* <DropdownItem tag="a" href="#"><i className="bx bx-wallet font-size-16 align-middle mr-1"></i>Token</DropdownItem>
                        <DropdownItem tag="a" href="#"><span className="badge badge-success float-right">11</span><i className="mdi mdi-settings font-size-17 align-middle mr-1"></i>Cài đặt</DropdownItem> */}
                        {/* <DropdownItem tag="a" href="#"><i className="bx bx-lock-open font-size-16 align-middle mr-1"></i>Xóa tài khoản</DropdownItem> */}
                        <div className="dropdown-divider"></div>
                        <Link to="/logout" className="dropdown-item">
                            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                            <span>Đăng xuất</span>
                        </Link>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
	const { id, username } = state.profile;
	return {
		layout: state.layout,
		userId: id,
        username
	};
};

export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(ProfileMenu);


