import React from 'react';

const SearchHistory = ({ searchHistory, performSearch, deleteSearchHistory, clearSearchHistory }) => {
    return (
        <div>
            <h3 className="text-center text-white mt-4">Search History</h3>
            {searchHistory.length > 0 ? (
                <ul className="list-group">
                    {searchHistory.map((searchItem, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{searchItem.string}</span>
                            <div>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => performSearch(searchItem.string)}>
                                    Search
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteSearchHistory(index)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-white mt-4">No search history.</p>
            )}
            <div className="mt-3">
                <button className="btn btn-danger" onClick={clearSearchHistory}>
                    Clear History
                </button>
            </div>
        </div>
    );
};

export default SearchHistory;
