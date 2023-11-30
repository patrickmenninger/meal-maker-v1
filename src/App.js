import './App.css';
import {Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import Home from './components/home/Home'
import Header from './components/header/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} /> 
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>  
      </Routes>
    </div>
  );
}

export default App;
