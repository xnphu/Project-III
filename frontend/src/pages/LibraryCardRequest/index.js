import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Media, Table, Modal } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { saveLibraryCard } from '../../store/actions/library-card';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import SweetAlert from "react-bootstrap-sweetalert";


const LibraryCardRequest = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token);
    const userId = useSelector(state => state.profile.id);
    const libraryCard = useSelector(state => state.libraryCard);
    const onUpdateLibraryCard = libraryCard => dispatch(saveLibraryCard(libraryCard));

    const [alert, setAlert] = useState(<></>);

    const getLibraryCard = async (value) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/library-card/${userId}/member/`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res getLibraryCard', response.data);
            if (response.data) {

            }
        } catch (error) {
            console.log('err getLibraryCard', error.response.data);
        }
    }

    const requestLibraryCard = async (value) => {
        try {
            const response = await axios.post(`${BASE_API_URL}/library-card`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res requestLibraryCard', response.data);
            if (response.data) {
                onUpdateLibraryCard(response.data);
            }
        } catch (error) {
            console.log('err requestLibraryCard', error.response.data);
            setAlert(
                <SweetAlert
                    danger
                    title="Request library card fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                >
                    You need to add your profile information
                </SweetAlert>
            );
        }
    }

    useEffect(() => {
        getLibraryCard();
    }, []);

    return (
        <div className="page-content">
            <Container fluid>
                {alert}
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4 text-center"><h2>Request Library card</h2></CardTitle>
                        {
                            libraryCard.id == undefined
                                ? <div className="mb-4 text-center">You don't have a library card, <Link to={'#'} onClick={() => requestLibraryCard()}>Click here</Link> to request to Admin/Librarian.</div>
                                : <>
                                    <div className="mb-4 text-center">{libraryCard.id}</div>
                                </>
                        }
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default LibraryCardRequest;