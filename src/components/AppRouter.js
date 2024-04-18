import {Route, Routes} from "react-router";
import HomePage from "../page/HomePage";
import {BrowserRouter} from "react-router-dom";
import LoginPage from "../page/LoginPage";
import BookDetailPage from "../page/BookDetailPage";
import CartPage from "../page/CartPage";
import ProfilePage from "../page/ProfilePage";

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
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
