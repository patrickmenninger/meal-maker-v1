import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
            </Route>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
        </Routes>
    </BrowserRouter>
  )
};

export default App