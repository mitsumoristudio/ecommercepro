import {Link, useParams} from "react-router-dom";
import Ratings from "../components/Ratings";
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl} from "react-bootstrap";
import {useGetProductDetailsByIdQuery} from "../features/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {useState} from "react";
import {addToCart} from "../features/slices/cartSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


// TODO Before adding Redux reducers
//import {useParams} from "react-router-dom";
// import products from "../assets/mockdata/products";
// import {useEffect, useState} from "react";
// import axios from "axios";

export default function ProductScreen() {
    const {id: productId} = useParams();
    const {data: product, isLoading, error} = useGetProductDetailsByIdQuery(productId);

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    // useDispatch is necessary for async function
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate("/cart")
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
        <>
        <Link to={'/'} className={'btn btn-light my-3'}>
            Go Back
        </Link>
            {isLoading ? (<Loader/>) : error ? (
                <Message variant={'danger'}>{error?.data?.message || error.error }</Message>
            ) : (<Row>
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
            </Row>)}
        </>
    )
}