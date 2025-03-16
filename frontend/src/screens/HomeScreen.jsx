
import React from 'react';
import {Row, Col} from 'react-bootstrap';
// import products from '../assets/mockdata/products'
import {useEffect, useState} from "react";
import Product from '../components/Product';
import axios from "axios";

export default function HomeScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('/api/products');
            setProducts(data);
        }
        fetchProducts();
    },[])

    return (
        <>
            <div className={'flex-column align-items-center px-4 gap-2'}>
        <h1 className={'py-3 px-3'}>Latest Products</h1>
            <Row>
                {products.map(product => {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={5} xl={4}>
                            <Product product={product} />
                        </Col>
                    )
                })}
            </Row>
        </div>
        </>
    )
}