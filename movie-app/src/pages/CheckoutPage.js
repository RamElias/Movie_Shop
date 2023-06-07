import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";

export default function CheckoutPage() {
    const [firstName, setFirstName] = useState(''); // State for storing the first name
    const [lastName, setLastName] = useState(''); // State for storing the last name
    const [email, setEmail] = useState(''); // State for storing the email
    const [payment, setPayment] = useState(0); // State for storing the payment amount
    const [isLoading, setIsLoading] = useState(true); // State for tracking loading state
    const [message, setMessage] = useState(''); // State for displaying messages

    useEffect(() => {
        setMessage('Loading payment information...');
        fetchPayment();
    }, []);

    /**
     * Handles the form submission for checkout.
     * @param {Event} e The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const purchase = {
            firstName,
            lastName,
            email,
            payment,
        };

        try {
            await axios.post('/checkout', purchase);
            alert('Payment successful!');
            window.location.href = '/';
        } catch (error) {
            console.error('Error during checkout:', error);
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
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching payment:', error);
            setMessage('Error loading cart');
        }
    };

    return (
        <div className="container">
            <h1 className="text-center text-white mt-4">Checkout</h1>
            {isLoading ? (
                <Card className="text-center fs-2 m-4">
                    <Card.Text>
                        <br/>
                        {message}
                        <br/>
                    </Card.Text>
                </Card>
            ) : payment === 0 ? (
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
                <Card className="mx-auto mt-4" style={{maxWidth: '400px'}}>
                    <Card.Body>
                        <h4 className="text-left">Please fill in your details</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="payment" className="form-label">
                                    Payment
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="payment"
                                    value={payment}
                                    readOnly
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
