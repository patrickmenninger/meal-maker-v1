import './App.css';
import {Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import Home from './components/home/Home'
import Header from './components/header/Header';
import Register from './components/register/Register';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} /> 
          <Route path='/register' element={<Register />} />
        </Route>  
      </Routes>
    </div>
  );
}

export default App;
