import {Route, Routes} from "react-router";
import HomePage from "../page/HomePage";
import {BrowserRouter} from "react-router-dom";
import LoginPage from "../page/LoginPage";
import BookDetailPage from "../page/BookDetailPage";
import CartPage from "../page/CartPage";
import ProfilePage from "../page/ProfilePage";
import OrderPage from "../page/OrderPage";
import RegisterPage from "../page/RegisterPage";
import AdminBookPage from "../page/BookAdminPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                    index
                />
                <Route
                    path="/book/:id"
                    element={<BookDetailPage />}
                />
                <Route
                    path="/cart"
                    element={<CartPage />}
                />
                <Route
                    path="/order"
                    element={<OrderPage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
                <Route 
                    path="/admin/books"
                    element={<AdminBookPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
