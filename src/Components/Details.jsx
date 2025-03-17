import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';

const Details = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product by id (ensure proper comparison between id types)
    const foundProduct = products.find((p) => p.id === parseInt(id)); // Convert id to number if necessary
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const deleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setProducts(filteredProducts);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    Navigate('/');
  };

  return product ? (
    <div className="w-[80%] flex items-center h-full m-auto p-[8%]">
      <img className="object-contain h-[70%] w-[40%]" src={product.image} alt={product.title} />
      <div className="Content ml-[50px] w-[60%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-500 my-5">{product.category}</h3>
        <h2 className="text-red-400 mb-3">{product.price}</h2>
        <p className="mb-6">{product.description}</p>
        <Link to={`/edit/${product.id}`} className="hover:cursor-pointer py-2 mr-5 px-5 border rounded border-blue-400 text-blue-400">
          Edit{' '}
        </Link>
        <button
          onClick={() => deleteHandler(product.id)}
          className="hover:cursor-pointer py-2 mr-5 px-5 border rounded border-red-400 text-red-400"
        >
          Delete{' '}
        </button>
        <Link
          onClick={() => {
            Navigate(-1); // Go back to the previous page
          }}
          className="py-2 px-5 border rounded border-yellow-400 text-yellow-400"
        >
          Go Back
        </Link>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
