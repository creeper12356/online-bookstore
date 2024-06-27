import { Route, Routes } from "react-router";
import HomePage from "../page/HomePage";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import BookDetailPage from "../page/BookDetailPage";
import CartPage from "../page/CartPage";
import ProfilePage from "../page/ProfilePage";
import OrderPage from "../page/OrderPage";
import RegisterPage from "../page/RegisterPage";
import AdminBookPage from "../page/BookAdminPage";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <UserRoute>
                            <HomePage />
                        </UserRoute>
                    }
                    index
                />
                <Route
                    path="/book/:id"
                    element={
                        <UserRoute>
                            <BookDetailPage />
                        </UserRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <UserRoute>
                            <CartPage />
                        </UserRoute>
                    }
                />
                <Route
                    path="/order"
                    element={
                        <UserRoute>
                            <OrderPage />
                        </UserRoute>
                    }
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
                    element={
                        <UserRoute>
                            <ProfilePage />
                        </UserRoute>
                    }
                />
                <Route
                    path="/admin/books"
                    element={
                        <AdminRoute>
                            <AdminBookPage />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
