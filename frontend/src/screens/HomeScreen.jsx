// TODO added prior to reduxtoolkit
// import products from '../assets/mockdata/products'
// import {useEffect, useState} from "react";
// import axios from "axios";

import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import {useGetProductsQuery} from "../features/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function HomeScreen() {
    const { data: products, isLoading, isError } = useGetProductsQuery();

    // TODO before adding Redux/Toolkit
    // const [products, setProducts] = useState([]);
    //
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get('/api/products');
    //         setProducts(data);
    //     }
    //     fetchProducts();
    // },[])

    return (
        <>
            {isLoading ? (<Loader/>) : isError ? (<Message variant={'danger'}>{isError?.data?.message || isError.error}</Message>) : ( // ? for undefined
                <>
                <div className={'flex-column align-items-center px-4 gap-2'}>
                <h1 className={'py-3 px-3'}>Latest Products</h1>
                <Row>
                    {products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={5} xl={4}>
                                <Product product={product}/>
                            </Col>
                        )
                    })}
                </Row>
            </div>
                </>

    )}


        </>
    )
}