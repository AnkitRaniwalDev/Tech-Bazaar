import React from 'react'
import Card from './Card'
import { useState, useEffect } from 'react'

export default function Product({search}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                let url = "http://localhost:3000/product/products";

                if (search) {
                    url = `http://localhost:3000/product/search/${search}`;
                }

                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);

            } catch (error) {
                console.log(error);
            }
        };

        getProducts();

    }, [search]);




    return (
        <>
           
            <div className="mt-8  grid grid-cols-1 md:grid-cols-4 gap-1 hover:border-spacing-x-2 ">
                {products.map((item) => {
                    return (
                        <Card key={item._id} item={item} />
                    )
                })}



            </div>
        </>
    )
}
