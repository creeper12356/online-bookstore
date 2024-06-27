import { Route, Router, Routes } from "react-router";
import HomePage from "../page/HomePage";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import BookDetailPage from "../page/BookDetailPage";
import CartPage from "../page/CartPage";
import ProfilePage from "../page/ProfilePage";
import OrderPage from "../page/OrderPage";
import RegisterPage from "../page/RegisterPage";
import AdminBookPage from "../page/AdminBookPage";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AdminOrderPage from "../page/AdminOrderPage";
import AdminUserPage from "../page/AdminUserPage";

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
                    path="/profile/:userId"
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
                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <AdminOrderPage />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUserPage />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
