import { Box, Divider } from "@mui/material";
import BookSalesRankSubPage from "../components/BookSalesRankSubPage";
import { PrivateLayout } from "../components/Layout";
import RankingList from "../components/RankingList";
import { NavigatorIndexContext } from "../lib/Context";

const RankPage = () => {
    return <NavigatorIndexContext.Provider value={3}>
        <PrivateLayout>
            <BookSalesRankSubPage />
            <Divider textAlign="left" sx={{marginBottom: 5}}>用户消费榜</Divider>
        </PrivateLayout>
    </NavigatorIndexContext.Provider>;
};

export default RankPage;