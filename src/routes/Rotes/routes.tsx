import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import HomePage from "../../pages/HomePage";

const router = createBrowserRouter([

    {
        path: "/login",
        element: <LoginPage></LoginPage>,
        
    },
    {
        path:"/register",
        element: <RegisterPage></RegisterPage>
    },
    {
        path:"/",
        element: <HomePage></HomePage>
    }
])

export default router;