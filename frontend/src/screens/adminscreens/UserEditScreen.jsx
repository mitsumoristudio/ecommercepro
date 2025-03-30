
import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button, FormGroup, FormLabel, FormControl, FormCheck} from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {FormContainer} from "../../components/FormContainer";
import {toast} from "react-toastify";
import { useUpdateUserMutation, useGetUserDetailsQuery} from "../../features/slices/userApiSlice";

export default function UserEditScreen() {
    const {id: userId} = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
      try {
          await updateUser({
              userId: userId,
              name: name,
              email: email,
              isAdmin: isAdmin,
          });
          toast.success("User updated successfully!");
          refetch();
          navigate(`/admin/userlist`);
      } catch (err) {
          toast.error(err?.data?.message || "Something went wrong");
      }
    }

    return (
        <>
            <Link to={"/admin/userlist"} className={'btn btn-light my-3 px-3 mx-4'}>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User </h1>
                {loadingUpdate && <Loader/> }

                {isLoading ? <Loader /> : error ? <Message variant={"danger"} >
                    {error}
                </Message> : (
                    <Form className={"mt-2 p-2"} onSubmit={submitHandler}>
                        <FormGroup className={"mb-2"} controlId={"name"}>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type={"text"}
                                placeholder={"Enter Your Name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup className={"my-2"} controlId={"email"}>
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type={"text"}
                                placeholder={"Enter Email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        {/* IMAGE INPUT PLACEHOLDER */}
                        <FormGroup controlId={"isAdmin"} className={"my-2"}>
                            <FormCheck
                            type="checkbox"
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e)=> setIsAdmin(e.target.checked)}>
                            </FormCheck>
                        </FormGroup>

                        <Button
                            type={"submit"}
                            variant={"primary"}
                            className={`my-2`}>
                            Update
                        </Button>

                    </Form>
                )}
            </FormContainer>
        </>
    )
};