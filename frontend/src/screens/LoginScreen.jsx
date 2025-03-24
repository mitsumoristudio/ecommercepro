
import { useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import {FormContainer} from "../components/FormContainer";
import Loader from "../components/Loader";
import {toast} from "react-toastify";

import {useLoginMutation} from "../features/reduxslices/userApiSlice";
import {setCredentials} from "../features/reduxslices/authSlice";
import {useDispatch, useSelector} from "react-redux";

export default function LoginScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation();
    const {useInfo} = useSelector((state) => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (useInfo) {
            navigate((redirect));
        }
    }, [navigate,redirect, useInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap(); // unwrap from promise
            dispatch(setCredentials({...res,}));
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    };

    return (
        <FormContainer>
            <h1 className={`mt-4 text-secondary`}>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <FormGroup className={`my-4`} controlId="email">
                    <FormLabel >Email address</FormLabel>
                    <FormControl
                    type={`email`}
                    placeholder={`Enter Email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup className={`my-4`} controlId={"password"}>
                    <FormLabel >Password</FormLabel>
                    <FormControl
                        type={"password"}
                        placeholder={"Enter Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button type={`submit`} variant={`primary`} className={`mt-2`} disabled={isLoading}>
                    Sign In
                </Button>
                { isLoading && <Loader /> }
            </Form>

            <Row className={`py-3`}>
                <Col>New Customer <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}> Register </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}