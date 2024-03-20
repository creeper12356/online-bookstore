import {Box} from "@mui/material";
import '../css/BookDetailPage.css'
const PriceBox = ({price}) => {
    return (
        <Box
            className="price-box-container"
            sx={{display: 'flex', flexDirection: 'column'}}>
            <div className="price-box-text">抢购价</div>
            <div className="price-box-price">{`￥${price / 100}`}</div>
            <div style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                <div className="price-box-tag">店铺促销</div>
                <div className="price-box-text">满¥18减¥1，满¥48减¥3，满¥98减¥5，满¥198减¥10</div>
            </div>
            <div className="price-box-text">部分促销不可共享，请以购物车能享受的促销为准</div>
        </Box>
    );
};
export default PriceBox;
