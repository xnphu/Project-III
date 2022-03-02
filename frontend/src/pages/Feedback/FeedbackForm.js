import React, { useRef } from "react";
import {
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import { Formik } from "formik";

import axios from "axios";
import { BASE_API_URL } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import { addFeedback } from '../../store/actions/feedback';

const FeedbackForm = ({ setAlert }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.token);
    const formRef = useRef(null);

    const onAddFeedback= feedback => dispatch(addFeedback(feedback));

    const createFeedback = async (feedback) => {
        try {
            console.log("feedback ", feedback);

            const response = await axios.post(`${BASE_API_URL}/feedback/`, feedback, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("res ", response.data);
            if (response.data) {
                onAddFeedback(response.data);
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
            console.log("err ", error);
            setAlert(
                <SweetAlert
                    danger
                    title="Submit feedback fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                ></SweetAlert>
            );
        }
    };

    return (
        <Card>
            <CardBody>
                {/* <CardTitle className="mb-4 text-center">
                    <h2>Feedback for Library</h2>
                </CardTitle> */}
                <Formik
                    initialValues={{
                        content: "",
                    }}
                    onSubmit={(values) => {
                        createFeedback(values);
                        formRef.current.reset();
                    }}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <>
                            <h5 className="modal-title mt-0">Feedback content</h5>
                            <AvForm ref={formRef} onValidSubmit={handleSubmit}>
                                <AvInput
                                    name="content"
                                    style={{ resize: "none", height: "200px" }}
                                    label="Feedback content"
                                    placeholder="Type feedback content"
                                    type="textarea"
                                    errorMessage="Enter feedback content"
                                    validate={{ required: { value: true } }}
                                    onChange={handleChange}
                                />
                            </AvForm>
                            <center>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </center>
                        </>
                    )}
                </Formik>
            </CardBody>
        </Card>
    );
};

export default FeedbackForm;