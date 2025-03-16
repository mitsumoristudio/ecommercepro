
import {useParams} from "react-router-dom";
// import products from "../assets/mockdata/products";
import {Link} from "react-router-dom";
import Ratings from "../components/Ratings";
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ProductScreen() {
    const [product, setProduct] = useState({});

    const {id: productId} = useParams(); // useParams give us access to the id in the URL. We need to fetch the products with the correct ID in the url
  //  const product = products.find((p) => p._id === productId);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${productId}`);
            setProduct(data);
        };
        fetchProduct()
    }, [productId]);

    return (
        <>
        <Link to={'/'} className={'btn btn-light my-3'}>
            Go Back
        </Link>
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

                        <ListGroupItem>
                            <Button className={'btn-secondary'}
                                    type={'button'}
                                    disabled={product.countInStock === 0}
                            > Add To Cart
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
            </Row>
        </>
    )
}