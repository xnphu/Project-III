import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, CardTitle, Table } from "reactstrap";
import dayjs from 'dayjs';
import { RESERVATION_STATUS, RESERVATION_STATUS_LABEL, FORMAT } from '../../constant';

const LendingHistoryTable = ({ reservationHistory }) => {

    console.log('lalal: ', reservationHistory);
    return (
        <Card>
            <CardBody>
                <CardTitle className="mb-4">Book lend history</CardTitle>
                <>
                    {
                        reservationHistory.length != 0
                            ? <div className="table-responsive">
                                <Table className="table-centered table-nowrap table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Book title</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Create date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            reservationHistory
                                                .map((e, i) =>
                                                    <tr key={e.id} >
                                                        <td>
                                                            <p className="text-muted mb-0">{e.id}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-muted mb-0">{e.title}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-muted mb-0">{e.status}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-muted mb-0">{dayjs(e.create_date).format(FORMAT.DATETIME)}</p>
                                                        </td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            : <h5 className="text-center">No data</h5>
                    }
                </>
            </CardBody>
        </Card>
    );
}

LendingHistoryTable.propTypes = {
    reservationHistory: PropTypes.array.isRequired,
};

export default LendingHistoryTable;