import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";

const router = createBrowserRouter([

    {
        path: "/",
        element: <LoginPage></LoginPage>,
        
    },
    {
        path:"/register",
        element: <RegisterPage></RegisterPage>
    }
])

export default router;