import React, { useContext, useEffect, useState } from 'react';
import Nav from './Nav';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';
import axios from '../utils/axios';
const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split('=')[1]);
  const [filteredProducts, setfilteredProducts] = useState(null);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`/testproducts/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category == 'undefined') setfilteredProducts(products);
    if (category != 'undefined') {
      setfilteredProducts(products.filter(p=> p.category == category));
    }
  }, [category, products]);
  return products ? (
    <>
      <Nav />
      <div className=" w-[85%] p-10 pt-[5%] flex flex-wrap gap-2 overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p, i) => {
            return (
              <Link
                key={i}
                to={`/testproducts/details/${p.id}`}
                className="card p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center"
              >
                <div
                  className="hover:scale-110 w-full mb-3 h-[80%] bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                ></div>
                <h1 className="hover:text-blue-300 font-semibold text-center">{p.title}</h1>
              </Link>
            );
          })}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
