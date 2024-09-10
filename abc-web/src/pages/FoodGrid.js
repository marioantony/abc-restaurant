import React, { useState } from 'react';
import { Card, Container, Row, Col, Badge, Button, Modal, Form } from 'react-bootstrap';

const foodItems = [
    {
        id: 1,
        name: 'Pizza Margherita',
        price: '12.99',
        available: true,
        image: 'https://media.istockphoto.com/id/1414575281/photo/a-delicious-and-tasty-italian-pizza-margherita-with-tomatoes-and-buffalo-mozzarella.jpg?s=612x612&w=0&k=20&c=v8mdiAa_5NaRYtIscClXe85lLzkx7loSd9_pJWt9G2o='
    },
    {
        id: 2,
        name: 'Spaghetti Bolognese',
        price: '15.49',
        available: false,
        image: 'https://img.taste.com.au/5qlr1PkR/taste/2016/11/spaghetti-bolognese-106560-1.jpeg'
    },
    {
        id: 3,
        name: 'Chicken Alfredo',
        price: '13.99',
        available: true,
        image: 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/pjqxdufw/99a7c94e-3054-4e38-9d49-e1581459640a.jpg'
    },
    {
        id: 4,
        name: 'Caesar Salad',
        price: '9.99',
        available: true,
        image: 'https://img.taste.com.au/Yd40crwY/taste/2016/11/caesar-salad-29418-1.jpeg'
    },
    {
        id: 5,
        name: 'Grilled Salmon',
        price: '18.99',
        available: false,
        image: 'https://media.istockphoto.com/id/1214416414/photo/barbecued-salmon-fried-potatoes-and-vegetables-on-wooden-background.jpg?s=612x612&w=0&k=20&c=Y8RYbZFcvec-FXMMuoU-qkprC3TUFNiw3Ysoe8Drn6g='
    },
    {
        id: 6,
        name: 'Pizza Margherita',
        price: '12.99',
        available: true,
        image: 'https://media.istockphoto.com/id/1414575281/photo/a-delicious-and-tasty-italian-pizza-margherita-with-tomatoes-and-buffalo-mozzarella.jpg?s=612x612&w=0&k=20&c=v8mdiAa_5NaRYtIscClXe85lLzkx7loSd9_pJWt9G2o='
    },
    {
        id: 7,
        name: 'Spaghetti Bolognese',
        price: '15.49',
        available: false,
        image: 'https://img.taste.com.au/5qlr1PkR/taste/2016/11/spaghetti-bolognese-106560-1.jpeg'
    },
    {
        id: 8,
        name: 'Chicken Alfredo',
        price: '13.99',
        available: true,
        image: 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/pjqxdufw/99a7c94e-3054-4e38-9d49-e1581459640a.jpg'
    },
    {
        id: 9,
        name: 'Caesar Salad',
        price: '9.99',
        available: true,
        image: 'https://img.taste.com.au/Yd40crwY/taste/2016/11/caesar-salad-29418-1.jpeg'
    },
    {
        id: 10,
        name: 'Grilled Salmon',
        price: '18.99',
        available: false,
        image: 'https://media.istockphoto.com/id/1214416414/photo/barbecued-salmon-fried-potatoes-and-vegetables-on-wooden-background.jpg?s=612x612&w=0&k=20&c=Y8RYbZFcvec-FXMMuoU-qkprC3TUFNiw3Ysoe8Drn6g='
    }
];

function FoodGrid({ addToCart }) {
    const [showModal, setShowModal] = useState(false);
    const [currentFood, setCurrentFood] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });


    const handleImageClick = (item) => {
        setCurrentFood(item);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentFood(null);
    };

    const handleSaveChanges = () => {
        console.log("Food details updated:", currentFood);
        setShowModal(false);
    };

    // Filter food items by name and price range
    const filteredFoodItems = foodItems.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice =
            (!priceRange.min || item.price >= parseFloat(priceRange.min)) &&
            (!priceRange.max || item.price <= parseFloat(priceRange.max));
        return matchesName && matchesPrice;
    });

    return (
        <Container>
            <h2 className="text-center my-4">Food Menu</h2>

            {/* Search and Price Range Filters */}
            <Row className="mb-4">
                <Col xs={12} sm={6}>
                    <Form.Control
                        type="text"
                        placeholder="Search by food name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col xs={12} sm={3}>
                    <Form.Control
                        type="number"
                        placeholder="Min Price"
                        value={priceRange.min}
                        onChange={(e) =>
                            setPriceRange({ ...priceRange, min: e.target.value })
                        }
                    />
                </Col>
                <Col xs={12} sm={3}>
                    <Form.Control
                        type="number"
                        placeholder="Max Price"
                        value={priceRange.max}
                        onChange={(e) =>
                            setPriceRange({ ...priceRange, max: e.target.value })
                        }
                    />
                </Col>
            </Row>

            <Row>
                {filteredFoodItems.map((item, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
                        <Card className="shadow-sm h-100">
                            {/* Admin action - clicking on image to edit */}
                            <Card.Img
                                variant="top"
                                src={item.image}
                                alt={item.name}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleImageClick(item)}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-center">{item.name}</Card.Title>
                                <Card.Text className="text-center text-muted">
                                    Price: ${item.price}
                                </Card.Text>

                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <div>
                                        {item.available ? (
                                            <Badge bg="success">Available</Badge>
                                        ) : (
                                            <Badge bg="danger">Unavailable</Badge>
                                        )}
                                    </div>

                                    <Button
                                        variant="primary"
                                        size="sm"
                                        disabled={!item.available} // Disable if unavailable
                                        onClick={() => addToCart(item)}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal for Editing Food Details */}
            {currentFood && (
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Food Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formFoodName">
                                <Form.Label>Food Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentFood.name}
                                    onChange={(e) =>
                                        setCurrentFood({ ...currentFood, name: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formFoodPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentFood.price}
                                    onChange={(e) =>
                                        setCurrentFood({ ...currentFood, price: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formFoodAvailability">
                                <Form.Label>Availability</Form.Label>
                                <Form.Check
                                    type="switch"
                                    label={currentFood.available ? "Available" : "Unavailable"}
                                    checked={currentFood.available}
                                    onChange={(e) =>
                                        setCurrentFood({ ...currentFood, available: e.target.checked })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/*<Modal show={cart} onHide={handleClose}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Add to Cart</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        {selectedFood && (*/}
            {/*            <div>*/}
            {/*                <h5>{selectedFood.name}</h5>*/}
            {/*                /!*<p>Price: ${selectedFood.price.toFixed(2)}</p>*!/*/}
            {/*                <p>Availability: {selectedFood.available}</p>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={handleClose}>*/}
            {/*            Close*/}
            {/*        </Button>*/}
            {/*        <Button variant="primary" onClick={handleOrderNow}>*/}
            {/*            Order Now*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </Container>
    );
}

export default FoodGrid;
