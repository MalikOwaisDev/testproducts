import React, { useContext } from 'react';
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_cat = products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_cat = [...new Set(distinct_cat)];

  let color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()}, 0.5)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      <a className="py-2 px-5 border rounded border-blue-400 text-blue-400" href="/create">
        Add new Product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-xl w-[80%] mb-3 ">Category Filter</h1>
      <div className=" w-[80%]">
        {distinct_cat.map((c, i) => {
          return (
            <Link key={i} to={`/testproducts/?category=${c}`} className="flex items-center mb-3">
              {' '}
              <span
                style={{ backgroundColor: color() }}
                className="mr-2 rounded-full w-[15px] h-[15px] bg-blue-200"
              ></span>
              {c}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
