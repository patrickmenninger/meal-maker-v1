import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import RecipesPage from "./pages/RecipesPage";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

const App = () => {
  return (
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/recipes" element={<RecipesPage />}/>
                    </Route>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </AuthProvider>
  )
};

export default App