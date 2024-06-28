import BookSalesRankSubPage from "../components/BookSalesRankSubPage";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context";
import UserPurchaseRankSubPage from "../components/UserPurchaseRankSubPage";

const RankPage = () => {
    return <NavigatorIndexContext.Provider value={4}>
        <PrivateLayout>
            <BookSalesRankSubPage />
            <UserPurchaseRankSubPage />
        </PrivateLayout>
    </NavigatorIndexContext.Provider>;
};

export default RankPage;