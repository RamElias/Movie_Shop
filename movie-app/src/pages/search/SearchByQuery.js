import React from 'react';

export default function SearchByQuery({ searchString, handleSearchStringChange, handleSearch }) {
    return (
        <div className="col-12 col-md-6 mb-3">
            <div className="card h-100">
                <div className="card-header text-center" style={{ fontStyle: 'italic', fontSize: '24px', fontWeight: 'bold' }}>Search</div>
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <p className="text">Find movie by name:</p>
                        <div className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={searchString}
                                onChange={handleSearchStringChange}
                                placeholder="Enter search keyword" />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" type="button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

