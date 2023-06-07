import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { BsFillCartCheckFill, BsFillCartXFill, BsTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import noPosterImage from '../images/no-Image.png';

export default function CartPage() {
    // State variables for cart items, message, payment, and loading status
    const [cartItems, setCartItems] = useState([]); // Holds the cart items
    const [message, setMessage] = useState(''); // Holds the message for displaying cart status
    const [payment, setPayment] = useState(0); // Holds the total payment amount
    const [isLoading, setIsLoading] = useState(true); // Indicates if the cart is being loaded

    useEffect(() => {
        setMessage('Loading cart...');
        fetchCart();
        fetchPayment();
    }, []);

    /**
     * Fetches the cart items.
     */
    const fetchCart = async () => {
        try {
            const response = await axios.get('/cart');
            setCartItems(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setMessage('Error loading cart');
        }
    };

    /**
     * Removes a cart item.
     * @param {string} itemId The ID of the item to be removed.
     */
    const removeCartItem = async (itemId) => {
        try {
            await axios.delete(`/cart/delete${itemId}`);
            await fetchCart();
            await fetchPayment();
        } catch (error) {
            console.error('Error removing cart item:', error);
            setMessage('Error loading cart');
        }
    };

    /**
     * Empties the cart.
     */
    const emptyCart = async () => {
        try {
            await axios.delete('/cart/deleteAll');
            await fetchCart();
        } catch (error) {
            console.error('Error emptying cart:', error);
            setMessage('Error loading cart');
        }
    };

    /**
     * Fetches the payment information.
     */
    const fetchPayment = async () => {
        try {
            const response = await axios.get('/cart/total-price');
            setPayment(response.data);
        } catch (error) {
            console.error('Error fetching payment:', error);
            setMessage('Error loading cart');
        }
    };

    /**
     * Handles the checkout process.
     */
    const handleCheckout = () => {
        window.location.replace('/checkout');
    };

    return (
        <Container>
            <h1 className="text-center text-white mt-4">Cart</h1>
            {isLoading ? (
                <Card className="text-center fs-2 mt-4">
                    <Card.Text> <br />{message} <br /> </Card.Text>
                </Card>
            ) : cartItems.length === 0 ? (
                <Card className="my-4">
                    <Card.Body>
                        <div className="text-center">
                            <p className="mt-4 fs-3">
                                Your cart is empty. <br/>
                                Go to the <Link to="/">search page</Link> to add some movies...
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <Row className="justify-content-center">
                    <Col sm={6}>
                        {cartItems.map((item) => (
                            <Card key={item.id} className="mb-3">
                                <Row>
                                    <Col sm={5} className="d-flex align-items-center">
                                        <Card.Img
                                            src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : noPosterImage}
                                            alt={item.title}
                                            className="img-fluid"
                                            style={{height: '200px', objectFit: 'contain'}}
                                        />
                                    </Col>
                                    <Col sm={4} className="d-flex align-items-center justify-content-evenly">
                                        <div>
                                            <Card.Title className="mb-2">{item.title}</Card.Title>
                                            <Card.Text className="mb-1 font-weight-bold">
                                                Release Date: {item.release_date}
                                            </Card.Text>
                                            <Card.Text className="mb-1 font-weight-bold">
                                                Price: ${parseFloat(item.price).toFixed(2)}
                                            </Card.Text>
                                        </div>
                                    </Col>
                                    <Col sm={3} className="d-flex align-items-center justify-content-evenly">
                                        <Button variant="danger" onClick={() => removeCartItem(item.id)}>
                                            <BsTrash3Fill size={25}/>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </Col>
                    <Col sm={4} className="text-center">
                        <Card className="bg-white">
                            <Card.Body>
                                <div className="mb-4">
                                    <p className="fs-5">Amount of items: {cartItems.length}</p>
                                    <p className="fs-5">Total Cost: ${payment.toFixed(2)}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Button variant="secondary" onClick={emptyCart} className="me-2 btn-lg">
                                        Empty Cart <BsFillCartXFill/>
                                    </Button>
                                    <Button variant="primary" onClick={handleCheckout} className="btn-lg">
                                        Checkout <BsFillCartCheckFill/>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
