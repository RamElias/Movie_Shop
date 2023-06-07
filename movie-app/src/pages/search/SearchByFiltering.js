import React from 'react';

export default function SearchByFiltering({
                                              genreOptions,
                                              selectedGenres,
                                              handleGenreChange,
                                              selectedYears,
                                              handleReleaseYearChange,
                                              handleSearch,
                                          }) {
    return (
        <div className="col-12 col-md-6 ">
            <div className="card h-120">
                <div className="card-header text-center text"  style={{fontStyle: 'italic', fontSize: '24px', fontWeight: 'bold' }}>Discover</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-6 ">
                            <label className="form-label">Genres:</label>
                            <div className="dropdown mb-3">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="genreDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {selectedGenres.length > 0 ? `${selectedGenres.length} Genres Selected` : "Select Genres"}
                                </button>
                                <div className="dropdown-menu px-3"  data-bs-persistent="true" aria-labelledby="genreDropdown" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {genreOptions.map((genre) => (
                                        <div key={genre.id} className="form-check dropdown-item">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={genre.id}
                                                onChange={handleGenreChange}
                                                checked={selectedGenres.includes(genre.id)}
                                                id={`genreCheckbox${genre.id}`}
                                            />
                                            <label className="form-check-label"
                                                   htmlFor={`genreCheckbox${genre.id}`}>
                                                {genre.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label">Year:</label>
                            <div className="dropdown mb-3">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="yearDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {selectedYears.length > 0 ? `${selectedYears.length} Years Selected` : "Select Years"}
                                </button>
                                <div className="dropdown-menu px-3" aria-labelledby="yearDropdown"  data-bs-persistent="true" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {[...Array(50)].map((_, index) => {
                                        const year = 2023 - index;
                                        return (
                                            <div key={year} className="form-check dropdown-item">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={year}
                                                    onChange={handleReleaseYearChange}
                                                    checked={selectedYears.includes(year)}
                                                    id={`yearCheckbox${year}`}
                                                />
                                                <label className="form-check-label"
                                                       htmlFor={`yearCheckbox${year}`}>
                                                    {year}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Discover
                        </button>
                    </div>
                </div>
            </div>
        </div>);
};


