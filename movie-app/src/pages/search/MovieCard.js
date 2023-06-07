import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap';
import {FaCartPlus, FaCheck} from 'react-icons/fa';
import './SearchPage.css';
import noPosterImage from '../../images/no-Image.png';

const MovieCard = ({movie, addToCart}) => {
    const [showModal, setShowModal] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkCartStatus();
    }, []);


    const checkCartStatus = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`/cart/check/${movie.id}`);
            const inCart = response.data;
            setAddedToCart(inCart);
        } catch (error) {
            console.error('Error checking cart status:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleView = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleAddToCart = () => {
        addToCart(movie);
        setAddedToCart(true);
    };

    const truncateDescription = (description) => {
        const maxLength = 150;

        if (description && description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }

        return description;
    };

    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : noPosterImage;

    return (
        <div className="col-6 col-md-4 col-lg-3 d-flex align-items-stretch">
            <div className="card mb-4">
                <img src={posterPath} className="card-img-top" alt={movie.title || movie.name}/>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{movie.title || movie.name}</h5>
                    <p className="card-text">{truncateDescription(movie.overview)}</p>
                    <div className="row mt-auto">
                        <div className="col-6 col-lg-4">
                            <Button variant="primary" onClick={handleView}>
                                View
                            </Button>
                        </div>
                        <div className="col-8 col-md-8 col-lg-6">
                            <Button
                                // className={`cart-button ${addedToCart ? "added" : ""}`}
                                onClick={handleAddToCart}
                                variant={addedToCart ? "success" : "primary"}
                                disabled={addedToCart || isLoading}
                            >
                                {isLoading ? (
                                    "Loading..." // Display loading text while checking cart status
                                ) : addedToCart ? (<FaCheck />) : (<FaCartPlus />)
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} dialogClassName="custom-modal modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title || movie.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content modal-sm">
                        <div className="modal-image">
                            <img src={posterPath} alt={movie.title || movie.name} style={{width:'400px', height:'500px'}}/>
                        </div>
                        <div className="modal-details">
                            <p className="modal-description">
                                {movie.overview}
                                <br/>
                                Release date: {movie.release_date}
                            </p>
                            <p className="modal-price">Price: $3.99</p>
                            <Button
                                //className={`cart-button ${addedToCart ? "added" : ""}`}
                                variant={addedToCart ? "success" : "primary"}
                                onClick={handleAddToCart}
                                disabled={addedToCart}
                            >
                                {addedToCart ? <FaCheck/> : <FaCartPlus/>}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MovieCard;
