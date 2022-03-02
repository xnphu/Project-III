import React, { useState } from "react";
import {
    Container, Row, Col,
} from "reactstrap";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import ManageFeedback from "../Admin/ManageFeedback";

import { useSelector, useDispatch } from "react-redux";
import { ROLE } from "../../constant";

const Feedback = () => {
    const role = useSelector((state) => state.token.role);
    const [alert, setAlert] = useState(<></>);

    return (
        <div className="page-content">
            {alert}
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">Feedback</h4>
                        </div>
                    </Col>
                </Row>
                {
                    role === ROLE.ADMIN
                        ? <ManageFeedback />
                        : <>
                            <FeedbackForm setAlert={setAlert} />
                            <FeedbackList />
                        </>
                }

            </Container>
        </div>
    );
};

export default Feedback;
