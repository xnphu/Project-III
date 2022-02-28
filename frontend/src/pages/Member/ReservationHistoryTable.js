import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import TablePagination from '../../components/CommonForBoth/TablePagination';

const ReservationHistoryTable = ({ reservationHistory }) => {
    const BOOK_RESERVATION_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };
    const [searchKeyword, setSearchKeyword] = useState('');

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const listBookReservationFilter = reservationHistory.filter(e => e.title.toLowerCase().includes(searchKeywordLowerCase));

    return (
        <Card>
            <CardBody>
                <CardTitle className="mt-4 float-sm-left">Book reserve history</CardTitle>
                <div className="float-sm-right">
                    <form className="app-search d-none d-lg-block float-sm-right">
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <span className="bx bx-search-alt"></span>
                        </div>
                    </form>
                </div>
                <div className="table-responsive">
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
                                listBookReservationFilter
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
                                                <p className="text-muted mb-0">{e.create_date}</p>
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
                        pageSize={BOOK_RESERVATION_PAGE_SIZE}
                        length={listBookReservationFilter.length}
                        currentPage={currentPage}
                        handleClickPage={handleClickPage}
                    />
                </Col>
            </Row>
        </CardBody>
        </Card >
    );
}

ReservationHistoryTable.propTypes = {
    reservationHistory: PropTypes.array.isRequired,
};

export default ReservationHistoryTable;