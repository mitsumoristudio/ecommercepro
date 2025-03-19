
import {Navbar, Nav, Container, Badge} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";

import {useSelector} from "react-redux";

export default function Header() {
    const {cartItems} = useSelector((state) => state.cartSlice); // coming from store.js when we called the reducer
    // can access anything from the state
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

                            <Nav.Link href={"/login"}>
                                <FaUser /> Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}