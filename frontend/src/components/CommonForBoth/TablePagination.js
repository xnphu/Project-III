import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


const TablePagination = (props) => {
    const { pageSize, length, currentPage, handleClickPage } = props;
    var totalPage = Math.ceil(length / pageSize);

    return (
        <Pagination className="pagination pagination-rounded justify-content-center mt-4">
            <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                    onClick={e => handleClickPage(e, currentPage - 1)}
                    previous
                />
            </PaginationItem>

            {
                [...Array(totalPage)].map((page, i) =>
                    <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => handleClickPage(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

            <PaginationItem disabled={currentPage >= totalPage - 1}>
                <PaginationLink
                    onClick={e => handleClickPage(e, currentPage + 1)}
                    next
                />
            </PaginationItem>
        </Pagination>
    );
}

export default TablePagination;