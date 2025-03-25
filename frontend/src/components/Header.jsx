
import {Navbar, Nav, Container, Badge, NavDropdown} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";

import {useSelector, useDispatch} from "react-redux";
import {useLogoutMutation} from "../features/slices/userApiSlice";
import {logout} from "../features/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {resetCart} from "../features/slices/cartSlice";
import {LinkContainer} from "react-router-bootstrap";

export default function Header() {
    const {cartItems} = useSelector((state) => state.cartslice); // coming from store.js when we called the reducer
    // can access anything from the state
    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            dispatch(resetCart())
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header>
            <Navbar bg={"dark"} variant={"dark"} expand={'md'} collapseOnSelect={true}>
                <Container>
                    <Navbar.Brand href={"/"}>Pro Sports Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={"ms-auto"} >

                            <Nav.Link href="/cart">
                                <FaShoppingCart size={22} />
                                {cartItems.length > 0 && (
                                    <Badge pill bg={'success'} style={{marginLeft: "5px"}}>
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </Badge>
                                )}
                            </Nav.Link>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id={`username`}>
                                    <Nav.Link to={`/profile`}>
                                        <NavDropdown.Item >Profile</NavDropdown.Item>
                                    </Nav.Link>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                </NavDropdown>
                            ) : (<Nav.Link href={"/login"}>
                                <FaUser /> Sign In
                            </Nav.Link>)}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title={"Admin"} id={`adminmenu`}>
                                    <NavDropdown.Item href={"/admin/orderlist"}>
                                        Orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={"/admin/productlist"}>
                                        Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={"/admin/userlist"}>
                                        Users
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}