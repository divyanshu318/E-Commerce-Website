import React, { useEffect, useState }  from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
const HomePage = () => {
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [cart,setCart] = useCart();
  const navigate = useNavigate();
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };


  useEffect(() => {
    getAllCategory();
  }, []);
  const getAllProducts = async () =>{
    try { 
      const {data} = await axios.get('/api/v1/product/get-product');
      setProducts(data.products)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");      
    }
  }
  const handleFilter = (value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id);
    }else{
      all = all.filter((c)=> c!==id);
    }
    setChecked(all);
  };
  useEffect(()=>{
    if(!checked.length || !radio.length)getAllProducts();
  },[checked.length, radio.length])

  //get filtered products
  const filterProduct = async ()=>{
    try {
      const {data} = await axios.post('/api/v1/product/product-filters',{checked,radio})
      setProducts(data?.products);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(checked.length || radio.length)filterProduct();
  },[checked, radio])
  return (
    <Layout title={"Best offers "}>
    <div className="row mt-3">
      <div className="col-md-2">
        <h6 className="text-center">Filter By Category</h6>
        <div className="d-flex flex-column">
          {categories?.map((c)=>(
            <Checkbox keys = {c._id} onChange={(e)=>handleFilter(e.target.checked,e._id)}>
              {c.name}
            </Checkbox>
          ))}
        </div>
        <h4 className="text-center">Filter By Price</h4>
        <div className="d-flex flex-column">
          <Radio.Group onChange={e=>setRadio(e.target.value)}>
            {Prices?.map(p=>(
              <div key = {p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div> 
      </div>
      <div className="col-md-9">
        <div className="h1 text-center">All Products</div>
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
                      <button className="btn btn-secondary" onClick={()=> {setCart([...cart,p]); toast.success("Item is Added in Cart")}}>Add To Cart</button>
                    </div>
                  </div>
              ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default HomePage;
