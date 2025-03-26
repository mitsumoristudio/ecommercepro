
import {Nav, NavbarBrand} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

export default function CheckoutSteps({step1, step2, step3, step4}) {
    return (
        <Nav className={'justify-content-center mb-4'}>
            <Nav.Item>
                {step1 ? (
                    <NavbarBrand to={"/login"}>
                        <Nav.Link>Sign In</Nav.Link>
                    </NavbarBrand>
                ) : (
                    <Nav.Link disabled={false}> Sign In </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <NavbarBrand to={"/shipping"}>
                        <Nav.Link>Shipping</Nav.Link>
                    </NavbarBrand>
                ) : (
                    <Nav.Link disabled={false}> Shipping </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <NavbarBrand to={"/payment"}>
                        <Nav.Link>Payment</Nav.Link>
                    </NavbarBrand>
                ) : (
                    <Nav.Link disabled={false}> Payment </Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <NavbarBrand to={"/placeorder"}>
                        <Nav.Link>Place Order</Nav.Link>
                    </NavbarBrand>
                ) : (
                    <Nav.Link disabled={false}> Place Order </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}