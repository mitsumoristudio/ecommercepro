

import {Table, Button, Row, Col, NavbarBrand} from "react-bootstrap";
import {FaTimes, FaEdit, FaTrash} from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {useGetProductsQuery, useCreateProductMutation} from "../../features/slices/productsApiSlice";
import {toast} from "react-toastify";


export default function ProductListScreen() {
    const {data: products, isLoading, isError,} = useGetProductsQuery();

    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();

            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

   const deleteHandler = () => {
       console.log(products);
   }

    return (
       <div className={"p-3 mt-2"}>
       <Row className={"align-items-center px-2"}>
           <Col>
               <h1>Products</h1>
           </Col>
           <Col className={"text-end"}>
               <Button className={"btn-sm m-3"}
               onClick={createProductHandler}>
                   <FaEdit /> Create Product
               </Button>
           </Col>
       </Row>

           {loadingCreate && <Loader />}
           {isLoading ? <Loader /> : isError ? <Message variant={"danger"}>
               {isError?.data?.message}
           </Message> : (
               <>
                   <Table striped={true} hover={true} responsive={true} className={"table-sm"}>
                       <thead>
                       <tr>
                           <th>ID</th>
                           <th>NAME</th>
                           <th>PRICE</th>
                           <th>CATEGORY</th>
                           <th>BRAND</th>
                           <th></th>
                       </tr>
                       </thead>
                       <tbody>
                       {products.map((product) => (
                           <tr key={product._id}>
                               <td>{product._id}</td>
                               <td>{product.name}</td>
                               <td>${product.price}</td>
                               <td>{product.category}</td>
                               <td>{product.brand}</td>
                               <td>
                                   <NavbarBrand href={`/admin/product/${product._id}/edit`}>
                                       <Button variant="light" className={"btn-sm mx-2"}>
                                           <FaEdit />
                                       </Button>
                                   </NavbarBrand>
                                   <Button variant={"danger"} className={"btn-sm"}
                                   onClick={() => deleteHandler(product._id)}>
                                       <FaTrash style={{color: "white"}} />
                                   </Button>
                               </td>
                           </tr>
                       ))}
                       </tbody>

                   </Table>
               </>
           )}

        </div>
    )
}