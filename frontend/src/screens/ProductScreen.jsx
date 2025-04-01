import {Link, useParams} from "react-router-dom";
import Ratings from "../components/Ratings";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem,
    FormControl,
    Form,
    FormGroup,
    FormLabel
} from "react-bootstrap";
import {useGetProductDetailsByIdQuery} from "../features/slices/productsApiSlice";
import {useCreateReviewMutation} from "../features/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {useState} from "react";
import {addToCart} from "../features/slices/cartSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Meta from "../components/Meta";


// TODO Before adding Redux reducers
//import {useParams} from "react-router-dom";
// import products from "../assets/mockdata/products";
// import {useEffect, useState} from "react";
// import axios from "axios";

export default function ProductScreen() {
    const {id: productId} = useParams();
    const {data: product, isLoading, error, refetch} = useGetProductDetailsByIdQuery(productId);
    const {userInfo} = useSelector(((state) => state.auth))

    const [createReview, {isLoading: loadingProductReview, }] = useCreateReviewMutation();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    // useDispatch is necessary for async function
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate("/cart")
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId: productId,
                rating: rating,
                comment: comment,

            }).unwrap();
            refetch();
            toast.success("Review was successfully created!");

            setRating(0);
            setComment("");
        } catch (err) {
            toast.error("Error creating review");
        }
    }

    // TODO Before adding Redux reducers
  //   const [product, setProduct] = useState({});
  //
  //   const {id: productId} = useParams(); // useParams give us access to the id in the URL. We need to fetch the products with the correct ID in the url
  // //  const product = products.find((p) => p._id === productId);
  //
  //   useEffect(() => {
  //       const fetchProduct = async () => {
  //           const { data } = await axios.get(`/api/products/${productId}`);
  //           setProduct(data);
  //       };
  //       fetchProduct()
  //   }, [productId]);

    return (
        <div className={`mt-2 p-2 px-2`}>
        <Link to={'/'} className={'btn btn-light my-3'}>
            Go Back
        </Link>
            {isLoading ? (<Loader/>) : error ? (
                <Message variant={'danger'}>{error?.data?.message || error.error }</Message>
            ) : (
                <>
                <Meta title={product.name} />

                <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid={true} />
                </Col>
                <Col md={4}>
                    <ListGroup variant={'flush'}>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Ratings
                                value={product.rating}
                                text={`${product.rating} reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>Price: ${product.price}</ListGroupItem>
                        <ListGroupItem>Description: {product.description}</ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <FormControl
                                            as={'select'}
                                            value = {qty}
                                            onChange={(e) => setQty(Number(e.target.value))}>
                                                {[...Array(product.countInStock).keys()].map((item) => (
                                                    <option key={ item + 1} value={ item + 1}>
                                                        {item + 1}
                                                    </option>
                                                )) }
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}

                            <ListGroupItem>
                                <Button className={'btn-secondary'}
                                        type={'button'}
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                > Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
                    <Row className={"review"}>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.review.length === 0 && <Message >No Reviews</Message>}
                            <ListGroup variant={"flush"}>
                                {product.review.map(review => (
                                    <ListGroupItem key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Ratings value={review.rating}/>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroupItem>
                                ))}

                                <ListGroupItem>
                                    <h2>Write a Customer Review</h2>
                                    {loadingProductReview && <Loader/>}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <FormGroup
                                            controlId={"rating"}
                                            className={"my-3 p-2"}>
                                                <FormLabel>Rating</FormLabel>
                                                <FormControl
                                                as={'select'}
                                                value={rating}
                                                onChange={(e)=> setRating(Number(e.target.value))}
                                                >
                                                    <option value={""}>Select...</option>
                                                    <option value={"1"}>1 - Poor </option>
                                                    <option value={"2"}>2 - Fair </option>
                                                    <option value={"3"}>3 - Average </option>
                                                    <option value={"4"}>4 - Very Good </option>
                                                    <option value={"5"}>5 - Excellent </option>

                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup controlId={"comment"} className={"my-2"}>
                                                <FormLabel >Comment</FormLabel>
                                                <FormControl
                                                as={'textarea'}
                                                row = "3"
                                                value={comment}
                                                onChange={(e)=> setComment(e.target.value)}
                                                ></FormControl>
                                                <Button
                                                type={"submit"}
                                                variant={"primary"}
                                                disabled={loadingProductReview}>
                                                    Submit
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    ) : (
                                        <Message variant={"flush"}>
                                            Please <Link to={"/login"}> SIGN IN </Link>
                                             to write a review {" "}
                                        </Message>
                                    )}

                                </ListGroupItem>

                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    )
}