import { useState, useEffect } from "react";

const BModal = ({ title, content }) => {
    useEffect(() => {
        // console.log(content);
    }, []);
    return (
        <>
            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalCenterTitle"
                            >
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body"> {content}</div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BModal;
