
import {useEffect, useState} from "react";
import {Form, Button, Col, Row, FormGroup, FormLabel, FormCheck} from "react-bootstrap";
import {FormContainer} from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../features/reduxslices/cartSlice";
import {useNavigate} from "react-router-dom";

export default function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cartSlice);
    const {shippingAddress} = cart;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder")
    }

    const {step1} = "step1"

    useEffect(() => {
        if (!shippingAddress) { // check if the shipping form has been filled out
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])

    return (
        <FormContainer>
            <CheckoutSteps step1={step1} />
            <h1>Payment Methods</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel column={"lg"} as={'legend'}>Select Method</FormLabel>
                    <Col>
                        <FormCheck
                        type="radio"
                        className={'my-3'}
                        label={'Paypal or Credit Card'}
                        id = "Paypal"
                        name="paymentMethod"
                        value={"Paypal"}
                        checked={paymentMethod === "Paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}>

                        </FormCheck>
                    </Col>
                </FormGroup>

                <Button type={'submit'} variant={'primary'}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}