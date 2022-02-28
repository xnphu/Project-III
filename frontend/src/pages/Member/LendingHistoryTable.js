import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";
import TablePagination from '../../components/CommonForBoth/TablePagination';

const LendingHistoryTable = () => {
    const lendingHistory = useSelector(state => state.bookLend.member);

    const BOOK_LENDING_PAGE_SIZE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handleClickPage = (event, index) => {
        event.preventDefault();
        setCurrentPage(index);
    };
    const [searchKeyword, setSearchKeyword] = useState('');

    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    const listBookLendingFilter = lendingHistory ? lendingHistory.filter(e => e.title.toLowerCase().includes(searchKeywordLowerCase)) : [];
    
    return (
        <Card>
            <CardBody>
                <CardTitle className="mt-4 float-sm-left">Book lend history</CardTitle>
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
                                <th scope="col">Lend date</th>
                                <th scope="col">Due date</th>
                                <th scope="col">Member return date</th>
                                <th scope="col">Fine ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listBookLendingFilter
                                    .map((e, i) =>
                                        <tr key={e.id} >
                                            <td>
                                                <p className="text-muted mb-0">{e.id}</p>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-0">{e.title}</p>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-0">{e.create_date}</p>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-0">{e.due_date}</p>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-0">{e.return_date}</p>
                                            </td>
                                            <td>
                                                <p className="text-muted mb-0">{e.fine_amount}</p>
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
                        pageSize={BOOK_LENDING_PAGE_SIZE}
                        length={listBookLendingFilter.length}
                        currentPage={currentPage}
                        handleClickPage={handleClickPage}
                    />
                </Col>
            </Row>
        </CardBody>
        </Card >
    );
}

export default LendingHistoryTable;