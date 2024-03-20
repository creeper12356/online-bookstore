import {Route, Routes} from "react-router";
import HomePage from "../page/HomePage";
import {BrowserRouter} from "react-router-dom";
import LoginPage from "../page/LoginPage";
import BookDetailPage from "../page/BookDetailPage";

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
                    path="/login"
                    element={<LoginPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
