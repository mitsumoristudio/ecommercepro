
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {Form, Button, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {FormContainer} from "../../components/FormContainer";
import {toast} from "react-toastify";
import {useUpdateProductMutation, useGetProductDetailsByIdQuery} from "../../features/slices/productsApiSlice";

export default function ProductEditScreen() {
    const { id: productId } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const { data: product, isLoading, refetch, error } = useGetProductDetailsByIdQuery(productId);

    const [updateProduct, {isLoading : loadingUpdate }] = useUpdateProductMutation();

    const navigate = useNavigate();

    // const onSubmitHandler = async (e) => {
    //     e.preventDefault();
    //     const productUpdate = {
    //         _id: productId,
    //         name: name,
    //         price: price,
    //         image: image,
    //         brand: brand,
    //         category: category,
    //         countInStock: countInStock,
    //         description: description,
    //     }
    //     const result = updateProduct(productUpdate);
    //
    //     if (result.error) {
    //         toast.error(result.error.message);
    //     } else {
    //         toast.success("Product updated successfully");
    //         navigate("/admin/productlist")
    //     }
    // };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId: productId,
                name: name,
                price: price,
                image: image,
                brand: brand,
                category: category,
                description: description,
                countInStock: countInStock,
            }).unwrap();

            toast.success("Product updated!");

            refetch();
            navigate("/admin/productlist");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }

    }, [product]);



    return (
        <>
        <Link to={"/admin/productlist"} className={'btn btn-light my-3 px-3 mx-4'}>
            Go Back
        </Link>

            <FormContainer>
                <h1>Edit Product</h1>
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

                        <FormGroup className={"my-2"} controlId={"price"}>
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                type={"number"}
                                placeholder={"Enter Price"}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        {/* IMAGE INPUT PLACEHOLDER */}

                        <FormGroup className={"my-2"} controlId={"brand"}>
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                type={"text"}
                                placeholder={"Enter Brand"}
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup className={"my-2"} controlId={"countInStock"}>
                            <FormLabel>Count In Stock</FormLabel>
                            <FormControl
                                type={"number"}
                                placeholder={"Enter Count In Stock"}
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup className={"my-2"} controlId={"category"}>
                            <FormLabel>Category</FormLabel>
                            <FormControl
                                type={"text"}
                                placeholder={"Enter Category"}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup className={"my-2"} controlId={"description"}>
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                type={"text"}
                                placeholder={"Enter Description"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></FormControl>
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
}