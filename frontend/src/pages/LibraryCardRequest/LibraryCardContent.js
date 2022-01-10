import React, { Component, useState, useEffect } from 'react';

import Barcode from 'react-barcode';

const LibraryCardContent = (props) => {
    return (
        <>
            {
                props.libraryCard?.id != undefined
                    ? <center>
                        <Barcode value={props.libraryCard?.id} />
                        <h5 className="mb-4 text-center">
                            <b>Status</b>
                            <div>
                                {
                                    props.libraryCard?.active_flg == 1
                                        ? <>
                                            <div style={{ color: 'green' }}>Active</div>
                                            <div className="mt-2 text-center">{`From ${props.libraryCard?.issue_date}`}</div>
                                        </>
                                        : <>
                                            <div style={{ color: 'red' }}>Inactive</div>
                                            <div className="mt-2 text-center">You need to wait Admin/Librarian verify your information for using this card.</div>
                                        </>
                                }
                            </div>
                        </h5>
                    </center>
                    : <></>
            }
        </>
    );
}

export default LibraryCardContent;