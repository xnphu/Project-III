import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../constant";

const BookSuggest = () => {
    const token = useSelector((state) => state.token.token);
    const userId = useSelector((state) => state.profile.id);
    const [bookSuggest, setBookSuggest] = useState([]);

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const response = await axios.get(
                `${BASE_API_URL}/books/${userId}/suggest`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("res ", response.data);
            if (response.data) {
                setBookSuggest(response.data);
            }
        } catch (error) {
            console.log("err ", error);
        }
    };

    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">Book Suggest</h4>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {bookSuggest.map((book, key) => (
                        <Col xl="4" sm="6" key={book.id}>
                            <Card style={{ height: "350px" }}>
                                <CardBody>
                                    <div className="product-img position-relative">
                                        <img
                                            src={book.previewUrl}
                                            alt=""
                                            className="img-fluid mx-auto d-block"
                                            style={{ height: "100px" }}
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h5 className="mb-3">
                                            <Link to={"/books/" + book.id} target="_blank">{book.title}</Link>
                                        </h5>
                                        <div className="text-muted mb-3">{book.author_name}</div>
                                        <div className="text-muted mb-3">{book.subject}</div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default BookSuggest;
