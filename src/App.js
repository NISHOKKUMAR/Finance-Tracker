import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Navbar,Signup,Login} from './Components';
import {Income,Investments,HomePage} from './WebPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/income" element={<Income />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;


{/*import React from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Navbar,Signup,Login} from './Components';
import {Income,Investments,HomePage} from './WebPage';

const App = () => {
  const location = useLocation();
  
  const displayNavbar = !['/signup', '/login'].includes(location.pathname);

  return (
    <Router>
      {displayNavbar && <Navbar />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/income" element={<Income />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
export default App;
*/}