import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
                        limit,
                        page,
                        totalPage,
                        totalData,
                        onPageChange
                    }) => {
    const arrayPage = Array.from({length: totalPage}, (_, i) => i + 1);
    return (
        <div
            className="flex items-center justify-between px-4 py-3 sm:px-6 bg-gray-2 text-left dark:bg-meta-4">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">{(page - 1) * limit + 1} </span>
                        to{' '}
                        <span
                            className="font-medium">{(page * limit < totalData) ? (page * limit) : totalData} </span>
                        of{' '}
                        <span className="font-medium">{totalData}</span> results
                    </p>
                </div>
                <div>
                    <ul className="inline-flex items-center -space-x-px rounded-md shadow-sm">
                        <button
                            className="active:bg-indigo-600 active:text-white px-4 py-2 text-gray-900 font-semibold ring-1 ring-inset ring-gray-300"
                            onClick={() => {
                                const periodPage = (page > 1) ? (page - 1) : 1
                                onPageChange(periodPage)
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5"/>
                        </button>
                        {arrayPage.map((pageNumber, index) => {
                            return (
                                <button
                                    key={index}
                                    className={` px-4 py-2 text-gray-900 font-semibold ring-1 ring-inset ring-gray-300 
                                    ${(page === (index + 1)) ? "bg-indigo-600 text-white" : "active:bg-indigo-600 active:text-white"}`}
                                    onClick={() => onPageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}
                        <button
                            className="active:bg-indigo-600 active:text-white px-4 py-2 text-gray-900 font-semibold ring-1 ring-inset ring-gray-300"
                            onClick={() => {
                                const nextPage = (page < totalPage) ? (page + 1) : page
                                onPageChange(nextPage)
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5"/>
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
