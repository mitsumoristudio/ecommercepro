import {Table, Button } from "react-bootstrap";
import {FaTrash, FaTimes, FaEdit, FaCheck} from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {useGetUsersQuery, useDeleteUserMutation} from "../../features/slices/userApiSlice";
import {Link, NavLink} from "react-router-dom";
import {toast} from "react-toastify";

export default function UserListScreen() {
    const {data: users, isLoading, error, refetch} = useGetUsersQuery();

    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (userid) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userid);
                toast.success("User deleted successfully.");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div className={'mt-2 p-3'}>
            <h1>Users</h1>
            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Table striped={true} hover={true} responsive={true} className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>ADJUST</th>

                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>
                                    {user.email}
                                </a>
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <FaCheck style={{color: 'green'}}/>
                                ) : (
                                    <FaCheck style={{color: 'red'}}/>
                                )}
                            </td>
                            <td>
                                <NavLink to={`/admin/user/${user._id}/edit`}>
                                    <Button variant={"light"} className={"btn-sm mx-2"}>
                                        <FaEdit/>
                                    </Button>
                                </NavLink>

                                <Button
                                variant={"danger"}
                                className={"btn-sm"}
                                onClick={() => deleteHandler(user._id)}>
                                    <FaTrash style={{color: 'white'}}/>
                                </Button>

                            </td>
                            <td>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}