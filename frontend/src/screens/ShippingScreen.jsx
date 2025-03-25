
import {useState} from "react";
import {Form, Button, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import {FormContainer} from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { saveShippingAddress} from "../features/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";


export default function ShippingScreen() {
    const cart = useSelector((state) => state.cartslice);
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || "");
    const [country, setCountry] = useState(shippingAddress?.country || "");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({
            address: address,
            city: city,
            zipCode: zipCode,
            country: country,}));
        navigate(`/payment`);
    };
    const {step1} = "step1"


    return (
        <FormContainer>
            <CheckoutSteps step1={step1} />

            <h1 className={'mt-1'}>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup className={'my-2'} controlId={'address'}>
                    <FormLabel> Address </FormLabel>
                    <FormControl
                    type={'text'}
                    placeholder={'Enter Your Address'}
                    value={address}
                    required={true}
                    onChange={(e) => setAddress(e.target.value)}
                    ></FormControl>

                </FormGroup>

                <FormGroup className={'my-2'} controlId={'city'}>
                    <FormLabel column={true}> City</FormLabel>
                    <FormControl
                        type={'text'}
                        placeholder={'Enter Your City'}
                        value={city}
                        required={true}
                        onChange={(e) => setCity(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup className={'my-2'} controlId={'zipCode'}>
                    <FormLabel column={true}> Zip Code</FormLabel>
                    <FormControl
                        type={'text'}
                        placeholder={'Enter Your Zip Code'}
                        value={zipCode}
                        required={true}
                        onChange={(e) => setZipCode(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup className={'my-2'} controlId={'country'}>
                    <FormLabel column={true}> Country</FormLabel>
                    <FormControl
                        type={'text'}
                        placeholder={'Enter Your Country'}
                        value={country}
                        required={true}
                        onChange={ (e) => setCountry(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button type={'submit'} variant={'primary'}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}