import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Details from './Components/Details';
import Create from './Components/Create';
import Edit from './Components/Edit';

const App = () => {
  const { search, pathname } = useLocation();
  return (
    <div className="h-screen w-screen flex">
      {pathname != '/testproducts/' &&
        (search.length > 0 || (
          <Link to="/testproducts/" className="text-red-300 text-xl absolute left-[17%] top-[3%]">
            Home
          </Link>
        ))}
      <Routes>
        <Route path="/testproducts/" element={<Home />} />
        <Route path="/testproducts/create" element={<Create />} />
        <Route path="/testproducts/details/:id" element={<Details />} />
        <Route path="/testproducts/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
