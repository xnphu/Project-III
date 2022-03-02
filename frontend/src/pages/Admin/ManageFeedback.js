import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardTitle, Modal, Table, Button } from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { Formik } from 'formik';
import TablePagination from '../../components/CommonForBoth/TablePagination';
import SweetAlert from "react-bootstrap-sweetalert";

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';

import { editFeedback, saveFeedback, deleteFeedback } from '../../store/actions/feedback';

const ManageFeedback = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const feedbacks = useSelector(state => state.feedback.feedbacks);

    const onSaveFeedback = feedback => dispatch(saveFeedback(feedback));
    const onEditFeedback = feedback => dispatch(editFeedback(feedback));
    const onDeleteFeedback = id => dispatch(deleteFeedback(id));

    const [selectedFeedback, setSelectedFeedback] = useState({});

    const FEEDBACK_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };

    const [modalCreateVisibility, setModalCreateVisibility] = useState(false);

    const [alert, setAlert] = useState(<></>);

    useEffect(() => {
        fetchAllFeedbacks();
    }, []);

    const fetchAllFeedbacks = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/feedback/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('feedbacks ', response.data);
            if (response.data) {
                onSaveFeedback({ feedbacks: response.data, total: response.data.length });
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

    const createNewAnswer = async (feedback) => {
        try {
            console.log('feedback ', feedback);
            var submitFeedback = selectedFeedback;
            submitFeedback.answer = feedback.answer;

            const response = await axios.put(`${BASE_API_URL}/feedback/${selectedFeedback.id}`, submitFeedback, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                var newFeedback = response.data;
                var list = feedbacks;
                const index = list.findIndex((e) => e.id === newFeedback.id);
                onEditFeedback({ answer: newFeedback.answer, index });
                setModalCreateVisibility(false);
                setAlert(
                    <SweetAlert
                        success
                        title="Submit feedback success!"
                        onConfirm={() => setAlert(<></>)}
                        onCancel={() => setAlert(<></>)}
                    ></SweetAlert>
                );
            }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Submit feedback fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                ></SweetAlert>
            );
        }
    }

    const handleDeleteFeedback = async () => {
        try {
            const response = await axios.delete(`${BASE_API_URL}/feedback/${selectedFeedback.id}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data.success) {
                onDeleteFeedback({ id: selectedFeedback.id });
                setModalCreateVisibility(false);
                setAlert(
                    <SweetAlert
                        success
                        title="Delete feedback success!"
                        onConfirm={() => setAlert(<></>)}
                        onCancel={() => setAlert(<></>)}
                    ></SweetAlert>
                );
            }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Delete feedback fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                ></SweetAlert>
            );
        }
    }

    return (
        <>
            {alert}
            <Row>
                <Col lg="12">
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
                                                            setModalCreateVisibility(true);
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
                </Col>
            </Row>
            <Formik
                initialValues={{
                    answer: '',
                }}
                onSubmit={(values) => {
                    createNewAnswer(values);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Modal
                        className="modal-lg"
                        scrollable={true}
                        isOpen={modalCreateVisibility}
                        toggle={() => setModalCreateVisibility(!modalCreateVisibility)}
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
                                    setModalCreateVisibility(false)
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
                            <AvForm onValidSubmit={handleSubmit}>
                                <div className="mb-3"><b>Content: </b></div>
                                <textarea
                                    name="content"
                                    style={{ height: "200px", width: '100%', resize: "none", padding: "5px" }}
                                    type="textarea"
                                    defaultValue={selectedFeedback?.content}
                                    disabled={true}
                                />

                                <div className="my-3"><b>Answer: </b></div>
                                <AvField
                                    style={{ resize: "none", height: '200px' }}
                                    name="answer"
                                    placeholder="Type answer"
                                    type="textarea"
                                    errorMessage="Enter answer"
                                    validate={{ required: { value: true } }}
                                    value={selectedFeedback?.answer}
                                    onChange={handleChange}
                                />
                            </AvForm>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}>
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    setModalCreateVisibility(false)
                                }
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDeleteFeedback}
                                data-dismiss="modal"
                            >
                                Delete this feedback
                            </button>
                        </div>
                    </Modal>
                )}
            </Formik>
        </>
    );
}

export default ManageFeedback;