import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../utils/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmitVal = (data) => {
    // Update state
    setProducts((prev) => {
      // Find the index of the product to update
      const productIndex = prev.findIndex((p) => p.id == id);

      if (productIndex !== -1) {
        // Create a new array with the updated product
        const updatedProducts = [...prev];
        updatedProducts[productIndex] = { ...data, id: parseInt(id) }; // Keep the same ID

        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        return updatedProducts;
      }
      return prev;
    });
    toast("Edited Sucessfully");
    Navigate(-1);
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    const foundProduct = products.find((p) => p.id == id);
    if (foundProduct) {
      setproduct(foundProduct);
    }
  }, [setProducts, id]);

  const changeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitVal)} className="flex flex-col items-center p-[5%] w-screen h-screen">
        <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>

        {/* Image Input */}
        <input
          {...register('image', {
            required: 'Image URL is required',
          })}
          name="image"
          type="url"
          placeholder="Image"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          value={product.image || ''}
          onChange={changeHandler}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        {/* Title Input */}
        <input
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 3, message: 'Title must be at least 3 characters long' },
          })}
          name="title"
          type="text"
          placeholder="Title"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          value={product.title || ''}
          onChange={changeHandler}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        {/* Category Input */}
        <input
          {...register('category', {
            required: 'Category is required',
            minLength: { value: 3, message: 'Category must be at least 3 characters long' },
          })}
          name="category"
          type="text"
          placeholder="Category"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          value={product.category || ''}
          onChange={changeHandler}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

        {/* Price Input */}
        <input
          {...register('price', {
            required: 'Price is required',
            minLength: { value: 1, message: 'Price must be at least 1 character long' },
          })}
          name="price"
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          value={product.price || ''}
          onChange={changeHandler}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        {/* Description Input */}
        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters long' },
          })}
          name="description"
          placeholder="Description"
          rows="6"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          value={product.description || ''}
          onChange={changeHandler}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <button type="submit" className="hover:cursor-pointer text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Edit;
