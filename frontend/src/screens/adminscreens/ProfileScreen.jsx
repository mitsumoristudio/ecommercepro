
import {useState, useEffect} from "react";
import {Table, Form, Button, Row, Col, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import {NavbarBrand} from "react-bootstrap";
import {toast} from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {FaEdit, FaTimes} from "react-icons/fa";
import {useProfileMutation} from "../../features/slices/userApiSlice";
import {setCredentials} from "../../features/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useGetOrdersQuery} from "../../features/slices/orderApiSlice";

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile, {isLoading: loadingUpdateProfile }] = useProfileMutation();

    const {data: order, isLoading, error } = useGetOrdersQuery();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password}).unwrap();

                dispatch(setCredentials(res));
                toast.success("Profile updated successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        }

    }

    return (
        <>
        <Row className={"px-3 mt-2"}>
            <Col md={3}>
                <h2>User Profile</h2>

                <Form onSubmit={submitHandler}>
                    <FormGroup controlId="name" className={"my-2 mt-1"}>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                        type={"name"}
                        placeholder={"Enter your Name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId="email" className={"my-2 mt-1"}>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl
                            type={"email"}
                            placeholder={"Enter Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId="password" className={"my-2 mt-1"}>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type={"password"}
                            placeholder={"Enter Password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId="confirmPassword" className={"my-2 mt-1"}>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type={"confirmPassword"}
                            placeholder={"Please confirm your password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <Button type={"submit"} variant={"primary"} className={"my-2"}>
                        Update Profile
                    </Button>
                    { loadingUpdateProfile && <Loader /> }
                </Form>
            </Col>



            <Col md={9}>
                <h2> My Orders </h2>
                {isLoading ? (<Loader/>) : error ? (<Message variant={"danger"}>
                    {error?.data?.message || error.error}
                </Message>) : (
                    <Table striped={true} hover={true} responsive={true} className={"table-sm"}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {order.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: 'red' }} />)}
                                </td>
                                <td>
                                    <NavbarBrand href={`/order/${order._id}`}>
                                        <Button variant="light" className={"btn-sm mx-2"}>
                                            Details
                                        </Button>
                                    </NavbarBrand>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
        </>
    )
}