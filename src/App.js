import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Producto from './component/Producto';


function App() {
  return (
    <BrowserRouter>
•	    <Routes>
•	      <Route path="/" element={<Producto />} />    
•	    </Routes> 
•	  </BrowserRouter>

  );
}

export default App;
