
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Loader from "../components/Loader";
import {Form, Button, Row, Col, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import {useRegisterMutation} from "../features/reduxslices/userApiSlice";
import {setCredentials} from "../features/reduxslices/authSlice";
import {FormContainer} from "../components/FormContainer";

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state) => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate((redirect))
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        } else {
            try {
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials({...res,}));
                navigate(redirect);
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <FormContainer>
            <h1 className={`mt-4 text-secondary`}>Sign Up</h1>

            <Form onSubmit={submitHandler}>
                <FormGroup className={`my-4`} controlId={"name"}>
                    <FormLabel >Name</FormLabel>
                    <FormControl
                        type={"name"}
                        placeholder={"Enter Your Name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>

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

                <FormGroup className={`my-4`} controlId={"confirmpassword"}>
                    <FormLabel >Confirm Password</FormLabel>
                    <FormControl
                        type={"confirmpassword"}
                        placeholder={"Please confirm your password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button type={`submit`} variant={`primary`} className={`mt-2`} disabled={isLoading}>
                    Sign In
                </Button>
                { isLoading && <Loader /> }
            </Form>

            <Row className={`py-3`}>
                <Col>Already a member, <Link to={`/login`}> Login </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}