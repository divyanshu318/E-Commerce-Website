import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([]);
    const getProductsByCat = async ()=>{
        try {
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(()=>{
        if(params?.slug)getProductsByCat();
    },[params?.slug])
  return (
    <Layout>
        <div className="container mt-3">
            <h1 className='text-center'>{category?.name}</h1>
            <div className="d-flex flex-wrap">
                {products?.map((p) => (
                    <div className="card m-2" style={{ width: "18rem" }}>
                        <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        />
                        <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="card-text">${p.price}</p>
                        <button className="btn btn-primary" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                        <button className="btn btn-secondary">Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct
