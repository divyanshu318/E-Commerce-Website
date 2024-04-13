import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search';

const Search = () => {
    const[values,setValues] = useSearch();
  return (
    <div>
      <Layout title = {'Search Results'}>
        <div className="container">
            <div className="text-center">
                <h1>Search Results</h1>
                {console.log(values?.results.length)}
                <h6>{values?.results.length < 1 ? 'NO Product Found!':`Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap">
                    {values.results?.map((p) => (
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
                                <button className="btn btn-primary">More Details</button>
                                <button className="btn btn-secondary">Add To Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </Layout>
    </div>
  )
}

export default Search
