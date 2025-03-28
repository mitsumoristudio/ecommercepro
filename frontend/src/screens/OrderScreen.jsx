
import {Link, useParams} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {useGetOrderDetailsQuery,
        usePayOrderMutation,
        useDeliverOrderMutation,
} from "../features/slices/orderApiSlice";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

export default function OrderScreen() {
    const { id: orderId} = useParams();

    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);

    const [payOrder, {isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder, {isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const {userInfo} = useSelector((state) => state.auth);

    const deliveredOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success("Order delivered successfully.");

        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    return (
        isLoading ? <Loader/> : error ? <Message variant={"danger"} />
            : (
                <>
                    <h2 className={'text-secondary'}>Order: {order._id}</h2>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant={"flush"}>
                                <ListGroupItem>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>
                                        {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        {order.user.email}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message variant={"success"}>
                                            Delivered on {order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant={"danger"}>Not Delivered</Message>
                                    )}

                                </ListGroupItem>
                                <ListGroupItem>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant={"success"}>
                                            Paid on {order.paidAt}
                                        </Message>
                                    ) : (
                                        <Message variant={"danger"}>Not Paid </Message>
                                    )}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <h2>Order Items</h2>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name}
                                                    fluid={true} rounded={true} />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroupItem>

                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant={"flush"}>
                                    <ListGroupItem>
                                        <h2>Order Summary</h2>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>

                                    </ListGroupItem>
                                    {/* PAY ORDER PLACEHOLDER */}
                                    {/* MARK AS DELIVERED PLACEHOLDER */}
                                    {loadingDeliver && <Loader/>}

                                    {userInfo && userInfo.isAdmin && order.isPaid
                                    && !order.isDelivered && (
                                        <ListGroupItem>
                                            <Button type={"button"}
                                            className={'btn btn-block'}
                                            onClick={deliveredOrderHandler}>
                                                Mark As Delivered
                                            </Button>
                                        </ListGroupItem>
                                        )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )


    )
}