import {useEffect, useState} from "react";
import {getMe} from "../service/user";
import {Avatar, Button, Link} from "@mui/material";
import {PrivateLayout} from "../components/Layout";
import ValueCounter from "../components/ValueCounter";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const getUser = async () => {
        let res = await getMe();
        setUser(res);
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <PrivateLayout>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Button
                    variant="outlined"
                    style={{alignSelf: 'flex-end'
                }}>
                    登出
                </Button>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Avatar sx={{width: 150, height: 150}}/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 20,
                        flexGrow: 1,
                        gap: 20,
                    }}>
                        <div style={{font: '60px bold'}}>{user.nickname}</div>
                        <Link>creeperhjt@sjtu.edu.cn</Link>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '70%',
                        }}>
                            <ValueCounter value={1} label="关注"/>
                            <ValueCounter value={0} label="粉丝"/>
                            <ValueCounter value={user.balance / 100} label="余额"/>
                            <Button variant="outlined">编辑资料</Button>
                        </div>
                    </div>
                </div>
            </div>
        </PrivateLayout>
    );
}
export default ProfilePage;
