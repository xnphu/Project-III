import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardTitle, Modal, Table } from "reactstrap";
import TablePagination from '../../components/CommonForBoth/TablePagination';

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';

import { saveFeedback } from '../../store/actions/feedback';

const FeedbackList = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const userId = useSelector(state => state.profile.id);
    const feedbacks = useSelector(state => state.feedback.member);

    const onSaveFeedback = feedback => dispatch(saveFeedback(feedback));

    const [selectedFeedback, setSelectedFeedback] = useState({});

    const FEEDBACK_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        fetchAllFeedbacksByMemberId();
    }, []);

    const fetchAllFeedbacksByMemberId = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/feedback/${userId}/member`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('feedbacks ', response.data);
            if (response.data) {
                onSaveFeedback({ member: response.data, total: response.data.length, feedbacks: [] });
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle className="mt-4 float-sm-left">List of Feedbacks </CardTitle>
                    <div className="table-responsive">
                        <Table className="table-centered table-nowrap table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" style={{ width: "70px" }}>#</th>
                                    <th scope="col">Content</th>
                                    <th scope="col">Answer</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    feedbacks
                                        .slice(
                                            currentPage * FEEDBACK_PAGE_SIZE,
                                            (currentPage + 1) * FEEDBACK_PAGE_SIZE
                                        )
                                        .map((feedback, i) =>
                                            <tr
                                                key={feedback.id}
                                                onClick={() => {
                                                    setSelectedFeedback(feedback);
                                                    setModalVisibility(true);
                                                }}>
                                                <td>
                                                    <p className="text-muted mb-0">{feedback.id}</p>

                                                </td>
                                                <td>
                                                    <div
                                                        style={{ height: "80px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                                    >
                                                        <p className="text-muted mb-0" style={{ whiteSpace: "pre-wrap" }}>{feedback.content}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div
                                                        style={{ height: "80px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                                    >
                                                        <p className="text-muted mb-0" style={{ whiteSpace: "pre-wrap" }}>{feedback.answer}</p>
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
                            <TablePagination
                                pageSize={FEEDBACK_PAGE_SIZE}
                                length={feedbacks.length}
                                currentPage={currentPage}
                                handleClickPage={handleClickPage}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Modal
                className="modal-lg"
                scrollable={true}
                isOpen={modalVisibility}
                toggle={() => setModalVisibility(!modalVisibility)}
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="myLargeModalLabel"
                    >
                        Feeback Detail
                    </h5>
                    <button
                        onClick={() =>
                            setModalVisibility(false)
                        }
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="mb-3"><b>Content: </b></div>
                    <textarea
                        name="content"
                        style={{ height: "200px", width: '100%', resize: "none", padding: "5px" }}
                        type="textarea"
                        defaultValue={selectedFeedback?.content}
                        disabled={true}
                    />
                    <div className="mb-3"><b>Answer: </b></div>
                    <textarea
                        name="answer"
                        style={{ height: "200px", width: '100%', resize: "none", padding: "5px" }}
                        type="textarea"
                        defaultValue={selectedFeedback?.answer}
                        disabled={true}
                    />
                </div>
            </Modal>
        </>
    );
};

export default FeedbackList;
