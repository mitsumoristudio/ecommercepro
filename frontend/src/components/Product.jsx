
import { Card } from "react-bootstrap";
import Ratings from "./Ratings";

export default function Product({ product }) {
    return (
        <Card className={"my-2 p-3  rounded flex flex-column "}>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant={"top"} />
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as={"div"}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as={'div'}>
                    <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text as={"h3"}>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}