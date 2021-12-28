import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { logout } from '../../store/actions/auth';
import { removeAccessToken, removeRole} from '../../utils/RequestSagaUtils/token/actions';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    /**
     * Redirect to login
     */
    componentDidMount = () => {
        // emit the event
        this.props.onLogOut();
        this.props.onRemoveAccessToken();
        this.props.onRemoveRole();
        this.setState({ redirect: true });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'} />
        }
        return <React.Fragment></React.Fragment>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => {
            dispatch(logout());
        },
        onRemoveAccessToken: () => {
            dispatch(removeAccessToken());
        },
        onRemoveRole: () => {
            dispatch(removeRole());
        }
    }
}

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(Logout);
