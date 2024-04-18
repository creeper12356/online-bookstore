import {Divider, Tab, Tabs} from "@mui/material";
import {useState} from "react";

/**
 * 评论区组件
 * @returns {JSX.Element}
 * @constructor
 */
const CommentArea = () => {
    const [index, setIndex] = useState(0);
    return (
        <>
            <Divider className="book-detail-divider-text">书籍评论</Divider>
            <Tabs value={index} onChange={(e, newValue) => { setIndex(newValue); }}>
                <Tab label="最新评论" />
                <Tab label="最热评论" />
            </Tabs>
        </>
    );
};
export default CommentArea;
