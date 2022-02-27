import React from 'react';
import { Card, CardBody, CardTitle, Table } from "reactstrap";

const PersonalInformationCard = ({ profile }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle className="mb-4">Personal Information</CardTitle>

                <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                        <tbody>
                            <tr>
                                <th scope="row">Full Name :</th>
                                <td>{profile.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">DOB :</th>
                                <td>{profile.date_of_birth}</td>
                            </tr>
                            <tr>
                                <th scope="row">Gender :</th>
                                <td>
                                    {
                                        profile.gender != undefined
                                            ? profile.gender == 1
                                                ? 'Male'
                                                : 'Female'
                                            : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Mobile :</th>
                                <td>{profile.phone}</td>
                            </tr>
                            <tr>
                                <th scope="row">E-mail :</th>
                                <td>{profile.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">Location :</th>
                                <td>
                                    {profile.street != undefined && profile.city != undefined && profile.country != undefined
                                        ? `${profile.street}, ${profile.city}, ${profile.country}`
                                        : ''
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </CardBody>
        </Card>
    );
}

export default PersonalInformationCard;