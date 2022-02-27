import React, { Component, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Media, Table, Modal } from "reactstrap";

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { saveLibraryCard } from '../../store/actions/library-card';
import dayjs from 'dayjs';
import SweetAlert from "react-bootstrap-sweetalert";
import LibraryCardContent from './LibraryCardContent';


const LibraryCardRequest = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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
                onUpdateLibraryCard(response.data);
            }
        } catch (error) {
            console.log('err getLibraryCard', error.response.data);
        }
    }

    const requestLibraryCard = async (value) => {
        try {
            const response = await axios.post(`${BASE_API_URL}/library-card`, {}, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res requestLibraryCard', response.data);
            if (response.data) {
                onUpdateLibraryCard(response.data);
                setAlert(
                    <SweetAlert
                        success
                        title="Request library card success!"
                        onConfirm={() => setAlert(<></>)}
                        onCancel={() => setAlert(<></>)}
                        confirmBtnText={'OK'}
                    >
                    </SweetAlert>
                );
            }
        } catch (error) {
            console.log('err requestLibraryCard', error.response.data);
            setAlert(
                <SweetAlert
                    danger
                    title="Request library card fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                    confirmBtnText={'OK'}
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
        <div>
            {alert}
            {
                libraryCard.id == undefined
                    ? <div className="mb-4 text-center">You don't have a library card, <Link to={'#'} onClick={() => requestLibraryCard()}>Click here</Link> to request to Admin/Librarian.</div>
                    : <>
                        <h4 className="text-center">Your library card</h4>
                        <LibraryCardContent libraryCard={libraryCard} />
                    </>
            }
        </div>
    );
}

export default LibraryCardRequest;