import React from "react";
import { Row, Col } from "reactstrap";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            {new Date().getFullYear()} © PhuNX.
                        </Col>
                        <Col md={6}>
                            <div className="text-sm-right d-none d-sm-block">
                                
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
