import './App.css';
import {Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/persist/PersistLogin';
import Home from './components/home/Home'
import Header from './components/header/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Admin from './components/admin/Admin';
import Settings from './components/settings/Settings';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Layout />}>

          {/* public routes */}
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='unauthorized' />

          {/* private routes */}
          <Route element={<PersistLogin />}> 
            <Route element={<RequireAuth allowedRoles={[ 101 ]} />}>
              <Route path='/my-recipes' />
              <Route path='/my-plan' />
              <Route path='/macros' />
              <Route path='/settings' element={<Settings />}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ 201 ]} />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Route>

        </Route>  
      </Routes>
    </div>
  );
}

export default App;
