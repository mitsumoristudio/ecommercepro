
import {useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import {useCreateOrderMutation} from "../features/slices/orderApiSlice";
import {clearCartItems} from "../features/slices/cartSlice";


export default function PlaceOrderScreen() {
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cartslice);

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address) {
            navigate("/shipping");
        } else if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart.paymentMethod, cart.shippingAddress, navigate])

    const dispatch = useDispatch();
    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <CheckoutSteps />
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>
                            {cart.paymentMethod}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant={"flush"}>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid={true}
                                                    rounded={true}
                                                    >
                                                    </Image>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = $
                                                    {(item.qty * (item.price * 100)) / 100}
                                                </Col>

                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>

                    </ListGroup>
                </Col>
                <Col md={4} className={"mt-3 px-4 gap-2"}>
                    <Card>
                        <ListGroup variant={"flush"}>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && (
                                    <Message variant={"danger"}>{error.data.message}</Message>
                                )}
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button
                                type={"button"}
                                className={"btn-block"}
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroupItem>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}