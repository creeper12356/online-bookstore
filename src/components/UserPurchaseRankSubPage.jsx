import { Button, Divider, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SimpleDateRangePicker from "./SimpleDateRangePicker";
import { getUserRank } from "../service/user";
import RankNumber from "./RankNumber";
import PriceNumber from "./PriceNumber";
import UserBriefBox from "./UserBriefBox";

const UserPurchaseRankSubPage = () => {
    const column = ['排行', '用户名', '邮箱', '消费总额'];
    const [searchArgs, setSearchArgs] = useState({ from: null, to: null });
    const [userPurchaseList, setUserPurchaseList] = useState([]);

    const fetchAndSetUserPurchaseList = () => {
        getUserRank(searchArgs.from, searchArgs.to, 10).then(res => {
            setUserPurchaseList(res.items);
        });
    };
    useEffect(() => {
        fetchAndSetUserPurchaseList();
    }, [searchArgs]);
    return (
        <>
            <Divider textAlign="left" sx={{ marginBottom: 5 }}>用户消费榜</Divider>
            <SimpleDateRangePicker onRangeChanged={(from, to) => {
                setSearchArgs({ from: from, to: to });
            }} />
            <Table style={{ border: '1px solid', margin: 20 }}>
                <TableHead>
                    {column.map((attr, index) =>
                        <TableCell style={{ width: index === 0 || index === 1 || index === 3 ? '20%' : '40%' }}>{attr}</TableCell>)}
                </TableHead>
                <TableBody>
                    {userPurchaseList.map((userPurchase, index) =>
                        <TableRow>
                            <TableCell>
                                <RankNumber rank={index + 1} />
                            </TableCell>
                            <TableCell>
                                <UserBriefBox user={userPurchase} />
                            </TableCell>
                            <TableCell>
                                {userPurchase.email}
                            </TableCell>
                            <TableCell>
                                <PriceNumber price={userPurchase.purchase} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default UserPurchaseRankSubPage;