import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../utils/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);

  // Initialize id as a unique value using nanoid or Date.now
  const id = Date.now();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmitVal = (data) => {
    const newProduct = { ...data, id: id };

    // Update state
    setProducts((prev) => {
      const updatedProducts = [...prev, newProduct];

      // Save to localStorage
      localStorage.setItem('products', JSON.stringify([...prev, newProduct]));

      return updatedProducts;
    });
    toast.success("Product Added successfully")
    Navigate(-1);
  };

  // Load products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts)); // Set products to the data from localStorage
    }
  }, [setProducts]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitVal)} className="flex flex-col items-center p-[5%] w-screen h-screen">
        <h1 className="mb-5 w-1/2 text-3xl">Add new Product</h1>

        {/* Image Input */}
        <input
          {...register('image', {
            required: 'Image URL is required',
          })}
          type="url"
          placeholder="Image"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        {/* Title Input */}
        <input
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 3, message: 'Title must be at least 3 characters long' },
          })}
          type="text"
          placeholder="Title"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        {/* Category Input */}
        <input
          {...register('category', {
            required: 'Category is required',
            minLength: { value: 3, message: 'Category must be at least 3 characters long' },
          })}
          type="text"
          placeholder="Category"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

        {/* Price Input */}
        <input
          {...register('price', {
            required: 'Price is required',
            minLength: { value: 1, message: 'Price must be at least 1 character long' },
          })}
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        {/* Description Input */}
        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters long' },
          })}
          placeholder="Description"
          rows="6"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <button type="submit" className="hover:cursor-pointer text-2xl bg-zinc-300 rounded p-3 w-1/2 mb-3">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Create;
