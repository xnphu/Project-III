import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Media, Table, Modal } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/actions/user';
import { saveLibraryCard } from '../../store/actions/library-card';
import { Formik } from 'formik';
import SweetAlert from "react-bootstrap-sweetalert";
import dayjs from 'dayjs';
import { RESERVATION_STATUS, RESERVATION_STATUS_LABEL, FORMAT } from '../../constant';

import LibraryCardRequest from '../LibraryCardRequest/index';
import AvatarCard from './AvatarCard';
import PersonalInformationCard from './PersonalInformationCard';
import TotalNumberCard from './TotalNumberCard';
import ReservationHistoryTable from './ReservationHistoryTable';
import LendingHistoryTable from './LendingHistoryTable';

const MemberProfile = () => {
    const dispatch = useDispatch();
    const onUpdateProfile = profile => dispatch(updateProfile(profile));
    const onUpdateLibraryCard = libraryCard => dispatch(saveLibraryCard(libraryCard));


    const token = useSelector(state => state.token.token);
    const userId = useSelector(state => state.profile.id);
    const profile = useSelector(state => state.profile);
    const libraryCard = useSelector(state => state.libraryCard);

    const [genders, setGenders] = useState([{ id: 0, label: 'Female' }, { id: 1, label: 'Male' }]);
    const [miniCards, setMiniCards] = useState([
        { id: 0, title: "Total book lend", iconClass: "bx-check-circle", text: "0" },
        { id: 1, title: "Total book reserve", iconClass: "bx-hourglass", text: "0" },
        { id: 2, title: "Total fine", iconClass: "bx-package", text: "$0" }
    ]);
    const [reservationStatus, setReservationStatus] = useState([
        { value: RESERVATION_STATUS.WAITING, label: RESERVATION_STATUS_LABEL.WAITING },
        { value: RESERVATION_STATUS.PENDING, label: RESERVATION_STATUS_LABEL.PENDING },
        { value: RESERVATION_STATUS.COMPLETED, label: RESERVATION_STATUS_LABEL.COMPLETED },
        { value: RESERVATION_STATUS.CANCELED, label: RESERVATION_STATUS_LABEL.CANCELED },
        { value: RESERVATION_STATUS.VERIFIED, label: RESERVATION_STATUS_LABEL.VERIFIED },
    ]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [reservationHistory, setReservationHistory] = useState([]);
    const [alert, setAlert] = useState(<></>);
    const [isReloadCard, setIsReloadCard] = useState(false);

    useEffect(() => {
        fetchMemberProfile();
        getLibraryCard();
        fetchMemberReservationHistory();
    }, []);

    useEffect(() => {
        var temp = miniCards;
        temp[1].text = reservationHistory.length;
        setMiniCards(temp);
    }, [reservationHistory, isReloadCard]);

    const fetchMemberProfile = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/members/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                onUpdateProfile(response.data);
            }
        } catch (error) {
            console.log('err ', error);
        }
    }

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

    const fetchMemberReservationHistory = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/book-reserve/${userId}/member`, { headers: { Authorization: `Bearer ${token}` } });
            console.log('reservationHistory ', response.data);
            if (response.data) {
                var list = response.data;
                for (let i = 0; i < list.length; i++) {
                    list[i].create_date = dayjs(list[i].create_date).format(FORMAT.DATETIME);
                    for (let j = 0; j < reservationStatus.length; j++) {
                        if (list[i].status === reservationStatus[j].value) {
                            list[i].status = reservationStatus[j].label;
                        }
                    }
                }
                setReservationHistory(list);

                // re-render card with new data
                setIsReloadCard(!isReloadCard);
            }
        } catch (error) {
            console.log('err fetchMemberReservationHistory', error);
        }
    }

    const editProfile = async (value) => {
        try {
            console.log('profile ', value);
            var profileParam = value;
            var genderFound = genders.find((e) => e.label === value.gender || e.id === value.gender);
            profileParam.gender = genderFound.id;

            var response;

            if (profile.name == undefined) {
                response = await axios.post(`${BASE_API_URL}/members/`, profileParam, { headers: { Authorization: `Bearer ${token}` } });
            } else response = await axios.put(`${BASE_API_URL}/members/${userId}`, profileParam, { headers: { Authorization: `Bearer ${token}` } });
            console.log('res ', response.data);
            if (response.data) {
                setAlert(
                    <SweetAlert
                        success
                        title="Edit profile success!"
                        onConfirm={() => {
                            setModalVisibility(false);
                            setAlert(<></>);
                        }}
                        onCancel={() => {
                            setModalVisibility(false);
                            setAlert(<></>);
                        }}
                    >
                    </SweetAlert>
                );
                onUpdateProfile(response.data);
            }
        } catch (error) {
            console.log('err ', error);
            setAlert(
                <SweetAlert
                    danger
                    title="Edit profile fail!"
                    onConfirm={() => setAlert(<></>)}
                    onCancel={() => setAlert(<></>)}
                >
                </SweetAlert>
            );
        }
    }

    return (
        <div className="page-content">
            <Container fluid>

                {/* Render Breadcrumbs */}
                {/* <Breadcrumbs title="Contacts" breadcrumbItem="Profile" /> */}
                {alert}
                <Row>
                    <Col xl="4">
                        <AvatarCard profile={profile} onClickOpenModal={() => setModalVisibility(true)} />
                        <PersonalInformationCard profile={profile} />
                    </Col>

                    <Col xl="8">
                        <Row>
                            <TotalNumberCard miniCards={miniCards} />
                        </Row>
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4">Library card</CardTitle>
                                <LibraryCardRequest />
                            </CardBody>
                        </Card>
                        <ReservationHistoryTable reservationHistory={reservationHistory} />
                        <LendingHistoryTable reservationHistory={reservationHistory} />
                    </Col>
                </Row>
                <Formik
                    initialValues={{
                        student_id: '',
                        name: profile.name !== undefined ? profile.name : '',
                        email: profile.email !== undefined ? profile.email : '',
                        phone: profile.phone !== undefined ? profile.phone : '',
                        gender: profile.gender !== undefined
                            ? profile.gender === 1
                                ? 'Male'
                                : 'Female'
                            : 'Female',
                        date_of_birth: profile.date_of_birth !== undefined ? profile.date_of_birth : '',
                        street: profile.street !== undefined ? profile.street : '',
                        city: profile.city !== undefined ? profile.city : '',
                        country: profile.country !== undefined ? profile.country : '',
                        status: 1
                    }}
                    onSubmit={(values) => {
                        editProfile(values);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
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
                                    Edit Profile
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
                                <AvForm onValidSubmit={handleSubmit}>
                                    <AvField
                                        value={profile.name !== undefined ? profile.name : ''}
                                        name="name"
                                        label="Fullname"
                                        placeholder="Type fullname"
                                        type="text"
                                        errorMessage="Enter fullname"
                                        validate={{ required: { value: true } }}
                                        onChange={handleChange}
                                    />
                                    <AvField
                                        value={profile.email !== undefined ? profile.email : ''}
                                        name="email"
                                        label="Email"
                                        placeholder="Type email"
                                        type="text"
                                        errorMessage="Enter email"
                                        validate={{ required: { value: true } }}
                                        onChange={handleChange}
                                    />
                                    <AvField
                                        value={profile.phone !== undefined ? profile.phone : ''}
                                        name="phone"
                                        label="Phone"
                                        placeholder="Type phone"
                                        type="text"
                                        errorMessage="Enter phone"
                                        validate={{ required: { value: true }, maxLength: { value: 15 } }}
                                        onChange={handleChange}
                                    />
                                    <AvField
                                        value={profile.date_of_birth != undefined ? profile.date_of_birth : ''}
                                        name="date_of_birth"
                                        label="Date of birth"
                                        placeholder="Type date of birth"
                                        type="date"
                                        errorMessage="Enter date of birth"
                                        validate={{ required: { value: true } }}
                                        onChange={handleChange}
                                    />
                                    <AvField
                                        value={
                                            profile.gender != undefined
                                                ? profile.gender === 1
                                                    ? 'Male'
                                                    : 'Female'
                                                : 'Female'
                                        }
                                        type="select"
                                        name="gender"
                                        label="Gender"
                                        onChange={handleChange} required>
                                        {
                                            genders.map((e) => <option key={e.id}>{e.label}</option>)
                                        }
                                    </AvField>
                                    <AvField
                                        value={profile.street !== undefined ? profile.street : ''}
                                        name="street"
                                        label="Street"
                                        placeholder="Type street"
                                        type="text"
                                        errorMessage="Enter street"
                                        validate={{ required: { value: true } }}
                                        onChange={handleChange}
                                    />
                                    <AvField
                                        value={profile.city !== undefined ? profile.city : ''}
                                        name="city"
                                        label="City"
                                        placeholder="Type city"
                                        type="text"
                                        errorMessage="Enter city"
                                        validate={{ required: { value: true } }}
                                        onChange={handleChange}
                                    />
                                    <AvField
                                        value={profile.country !== undefined ? profile.country : ''}
                                        name="country"
                                        label="Country"
                                        placeholder="Type country"
                                        type="text"
                                        errorMessage="Enter country"
                                        validate={{ required: { value: true } }}
                                        onChange={handleChange}
                                    />
                                </AvForm>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmit}>
                                    Save changes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setModalVisibility(false)
                                    }
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </Modal>
                    )}
                </Formik>
            </Container>
        </div>
    );

}

export default MemberProfile;