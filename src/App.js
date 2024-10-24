import { Routes, Route } from 'react-router-dom';

import Home from './components/home/home.component';
import Navigation from './components/navigation/navigation.component';

const Shop = () => {
  return <h1>I am the shop page</h1>
}

const App = () => {
  return ( 
  <Routes>
    <Route path='/' element={<Navigation />} >
      <Route index element={<Home />} />
      <Route path='shop' element={<Shop />} />
    </Route>  
  </Routes>
  );
};

export default App;
