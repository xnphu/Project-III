import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, Media, Table, Modal } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import axios from 'axios';
import { BASE_API_URL } from '../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/actions/user';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import SweetAlert from "react-bootstrap-sweetalert";


const LibraryCardRequest = () => {

    const editProfile = async (value) => {
        // try {
        //     console.log('profile ', value);
        //     var profileParam = value;
        //     var genderFound = genders.find((e) => e.label === value.gender || e.id === value.gender);
        //     profileParam.gender = genderFound.id;

        //     var response;

        //     if (profile.name == undefined) {
        //         response = await axios.post(`${BASE_API_URL}/members/`, profileParam, { headers: { Authorization: `Bearer ${token}` } });
        //     } else response = await axios.put(`${BASE_API_URL}/members/${userId}`, profileParam, { headers: { Authorization: `Bearer ${token}` } });
        //     console.log('res ', response.data);
        //     if (response.data) {
        //         setModalVisibility(false);
        //         onUpdateProfile(response.data);
        //     }
        // } catch (error) {
        //     console.log('err ', error);
        // }
    }

    return (
        <div className="page-content">
            <Container fluid>
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4 text-center"><h2>Request Library card</h2></CardTitle>
                        <Row>
                            <Formik
                                initialValues={{
                                    // student_id: '',
                                    // name: profile.name != undefined ? profile.name : '',
                                    // email: profile.email != undefined ? profile.email : '',
                                    // phone: profile.phone != undefined ? profile.phone : '',
                                    // gender: profile.gender != undefined
                                    //     ? profile.gender == 1
                                    //         ? 'Male'
                                    //         : 'Female'
                                    //     : '',
                                    // date_of_birth: profile.date_of_birth != undefined ? profile.date_of_birth : '',
                                    // street: profile.street != undefined ? profile.street : '',
                                    // city: profile.city != undefined ? profile.city : '',
                                    // country: profile.country != undefined ? profile.country : '',
                                    // status: 1
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
                                    <>
                                        {/* <AvForm onValidSubmit={handleSubmit}>
                                            <AvField
                                                value={profile.name != undefined ? profile.name : ''}
                                                name="name"
                                                label="Fullname"
                                                placeholder="Type fullname"
                                                type="text"
                                                errorMessage="Enter fullname"
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                            <AvField
                                                value={profile.email != undefined ? profile.email : ''}
                                                name="email"
                                                label="Email"
                                                placeholder="Type email"
                                                type="text"
                                                errorMessage="Enter email"
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                            <AvField
                                                value={profile.phone != undefined ? profile.phone : ''}
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
                                                        ? profile.gender == 1
                                                            ? 'Male'
                                                            : 'Female'
                                                        : ''
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
                                                value={profile.street != undefined ? profile.street : ''}
                                                name="street"
                                                label="Street"
                                                placeholder="Type street"
                                                type="text"
                                                errorMessage="Enter street"
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                            <AvField
                                                value={profile.city != undefined ? profile.city : ''}
                                                name="city"
                                                label="City"
                                                placeholder="Type city"
                                                type="text"
                                                errorMessage="Enter city"
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                            <AvField
                                                value={profile.country != undefined ? profile.country : ''}
                                                name="country"
                                                label="Country"
                                                placeholder="Type country"
                                                type="text"
                                                errorMessage="Enter country"
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                        </AvForm> */}
                                    </>
                                )}
                            </Formik>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default LibraryCardRequest;