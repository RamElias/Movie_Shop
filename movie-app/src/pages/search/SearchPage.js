import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './SearchPage.css';
import MovieCard from './MovieCard';
import SearchByQuery from './SearchByQuery';
import SearchByFiltering from './SearchByFiltering';
import SearchHistory from "./SearchHistory";

const tmdb_api = 'https://api.themoviedb.org/3/';
const API_KEY = '0af7979050972da5d02a74cab3a5ae11';

const SearchPage = () => {
    const containerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [searchString, setSearchString] = useState('');
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [discoverResults, setDiscoverResults] = useState([]);
    const [showSearchHistory, setShowSearchHistory] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [querySearch, setQuerySearch] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCurrentPage(1);
        fetchGenreOptions();
        fetchCartCount();
    }, []);

    useEffect(() => {
        if (querySearch)
            handleQuerySearch(searchString);
        else
            handleDiscoverSearch(selectedGenres, selectedYears);
    }, [currentPage]);

    useEffect(() => {
        if (searchString !== '')
            setQuerySearch(true);
        handleQuerySearch(searchString);
    }, [searchString]);

    /**
     * Fetches the genre options from the TMDB API.
     */
    const fetchGenreOptions = async () => {
        try {
            const response = await axios.get(tmdb_api + 'genre/movie/list', {
                params: {
                    api_key: API_KEY,
                },
            });
            setGenreOptions(response.data.genres);
        } catch (error) {
            console.error('Error fetching genre options:', error);
        }
    };

    /**
     * Fetches the count of items in the cart.
     */
    const fetchCartCount = async () => {
        try {
            const response = await axios.get('/cart');
            setCartCount(response.data.length);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    /**
     * Handles the change of the search string input field.
     * @param {object} event - The event object.
     */
    const handleSearchStringChange = (event) => {
        setSearchString(event.target.value);
    };

    /**
     * Handles the change of genre selection checkboxes.
     * @param {object} event - The event object.
     */
    const handleGenreChange = (event) => {
        const genreId = parseInt(event.target.value);
        if (event.target.checked) {
            setSelectedGenres([...selectedGenres, genreId]);
        } else {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        }
    };

    /**
     * Handles the change of release year selection checkboxes.
     * @param {object} event - The event object.
     */
    const handleReleaseYearChange = (event) => {
        const year = parseInt(event.target.value);
        if (event.target.checked) {
            setSelectedYears([...selectedYears, year]);
        } else {
            setSelectedYears(selectedYears.filter((selectedYear) => selectedYear !== year));
        }
    };

    /**
     * Handles the click event of the search button.
     * Triggers a query-based search.
     */
    const searchButtonClick = () => {
        setQuerySearch(true);
        setCurrentPage(1);
        handleQuerySearch(searchString);
        addSearchHistory(searchString);
    };

    /**
     * Handles the click event of the discover button.
     * Triggers a discover-based search.
     */
    const discoverButtonClick = () => {
        setQuerySearch(false);
        setCurrentPage(1);
        handleDiscoverSearch(selectedGenres, selectedYears);
        addDiscoverHistory(selectedGenres, selectedYears);
    };

    /**
     * Handles the query-based search.
     * @param {string} searchString - The search string.
     */
    const handleQuerySearch = async (searchString) => {
        try {
            const searchParams = {
                api_key: API_KEY,
                query: searchString,
                include_adult: false,
            };

            const [searchResponse] = await Promise.all([
                axios.get(tmdb_api + 'search/multi', {
                    params: {
                        ...searchParams,
                        page: currentPage,
                    },
                })
            ]);

            setSearchResults(searchResponse.data.results);
            setTotalPages(searchResponse.data.total_pages);
            setTotalResults(searchResponse.data.total_results);


        } catch (error) {
            console.error('Error Query searching movies:', error);
        }
    };

    /**
     * Handles the discover-based search.
     * @param {number[]} genre - The selected genre IDs.
     * @param {number[]} years - The selected release years.
     */
    const handleDiscoverSearch = async (genre, years) => {
        try {
            const discoverParams = {
                api_key: API_KEY,
                include_adult: false,
            };

            if (genre.length > 0) {
                discoverParams.with_genres = genre.join(',');
            }

            if (years.length > 0) {
                discoverParams.primary_release_year = years.join(',');
            }

            const [discoverResponse] = await Promise.all([
                axios.get(tmdb_api + 'discover/movie', {
                    params: {
                        ...discoverParams,
                        page: currentPage,
                    },
                }),
            ]);
            setDiscoverResults(discoverResponse.data.results);
            setTotalPages(discoverResponse.data.total_pages);
            setTotalResults(discoverResponse.data.total_results);
        } catch (error) {
            console.error('Error discovering movies:', error);
        }
    };

    /**
     * Loads the next page of search results.
     */
    const loadNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
            scrollToTop();
        }
    };

    /**
     * Loads the previous page of search results.
     */
    const loadPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            scrollToTop();
        }
    };

    /**
     * Scrolls to the top of the container.
     */
    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    /**
     * Adds the search string to the search history.
     * @param {string} searchString - The search string.
     */
    const addSearchHistory = (searchString) => {
        const entry = {string: searchString, boolean: true};
        if (!searchHistory.some((entry) => entry.string === searchString)) {
            setSearchHistory((prevHistory) => [...prevHistory, entry]);
        }
    };

    /**
     * Adds the discover options to the search history.
     * @param {number[]} genre - The selected genre IDs.
     * @param {number[]} years - The selected release years.
     */
    const addDiscoverHistory = (genre, years) => {
        const genreNames = genre.map((id) => {
            const genreOption = genreOptions.find((g) => g.id === id);
            return genreOption ? genreOption.name : null;
        });

        const history = `${genreNames.filter(Boolean).toString()} | ${years.toString()}`;
        const entry = {string: history, boolean: false};

        if (!searchHistory.some((entry) => entry.string === history)) {
            setSearchHistory((prevHistory) => [...prevHistory, entry]);
        }
    };

    /**
     * Clears the search history.
     */
    const clearSearchHistory = () => {
        setSearchHistory([]);
    };

    /**
     * Deletes a search history item at the specified index.
     * @param {number} index - The index of the item to delete.
     */
    const deleteSearchHistoryItem = (index) => {
        setSearchHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
    };

    /**
     * Performs a search from the search history.
     * @param {string} history - The search history item.
     */
    const performSearchFromHistory = (history) => {
        setCurrentPage(1);
        const entry = searchHistory.find((entry) => entry.string === history);

        if (entry && entry.boolean) {
            setQuerySearch(true);
            setCurrentPage(1);
            handleQuerySearch(history);
        } else {
            const [genreString, yearString] = history.split(' | ');
            const genreNames = genreString.split(',');
            const genres = genreOptions
                .filter((option) => genreNames.includes(option.name))
                .map((option) => option.id);
            const years = yearString.split(',').map(Number);
            setQuerySearch(false);
            setCurrentPage(1);
            handleDiscoverSearch(genres, years);
        }
    };

    /**
     * Adds a movie to the cart.
     * @param {object} movie - The movie object.
     */
    const addToCart = async (movie) => {
        try {
            await axios.post('/cart', movie);
            fetchCartCount();
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center text-white mb-4">Search Page</h1>
            <div className="row">
                <SearchByQuery
                    searchString={searchString}
                    handleSearchStringChange={handleSearchStringChange}
                    handleSearch={searchButtonClick}
                />
                <SearchByFiltering
                    genreOptions={genreOptions}
                    selectedGenres={selectedGenres}
                    handleGenreChange={handleGenreChange}
                    selectedYears={selectedYears}
                    handleReleaseYearChange={handleReleaseYearChange}
                    handleSearch={discoverButtonClick}
                />
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col-auto mb-4">
                    <button className="btn btn-info" onClick={() => setShowSearchHistory(!showSearchHistory)}>
                        {showSearchHistory ? 'Hide Search History' : 'Show Search History'}
                    </button>
                </div>
            </div>

            {showSearchHistory && (
                <SearchHistory
                    searchHistory={searchHistory}
                    performSearch={performSearchFromHistory}
                    deleteSearchHistory={deleteSearchHistoryItem}
                    clearSearchHistory={clearSearchHistory}
                />
            )}

            <div ref={containerRef} className="row justify-content-center mt-4">
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6 text-left">
                            <h3 className="text-white mt-4">Results: {totalResults === 0 ? ('') : (totalResults)}</h3>
                        </div>
                        <div className="col-md-6 text-right">
                            <h3 className="text-white mt-4">Items in Cart: {cartCount}</h3>
                        </div>
                    </div>
                    <div className="row">
                        {querySearch ?
                            searchResults.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} addToCart={addToCart}/>
                            )) :
                            discoverResults.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} addToCart={addToCart}/>
                            ))}
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col-auto mb-4">
                    <button className="btn btn-primary me-2" onClick={loadPreviousPage}>
                        Previous Page
                    </button>
                    <button className="btn btn-primary" onClick={loadNextPage}>
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;