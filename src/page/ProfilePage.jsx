import {useEffect, useState} from "react";
import {getMe} from "../service/user";
import {Button} from "@mui/material";
import {PrivateLayout} from "../components/Layout";
import {NavigatorIndexContext} from "../lib/Context";
import UserProfile from "../components/UserProfile";

import '../css/ProfilePage.css';
import {logout} from "../service/auth";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const getUser = () => {
            getMe()
                .then(user => {
                    setUser(user);
                })
                .catch(e => {console.log(e); });
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <NavigatorIndexContext.Provider value={4}>
            <PrivateLayout>
                <div className="profile-page-container">
                    <Button
                        variant="outlined"
                        style={{alignSelf: 'flex-end'}}
                        href="/login"
                        onClick={async () => {
                            await logout();
                        }}
                    >
                        登出
                    </Button>
                    <UserProfile user={user} />
                </div>
            </PrivateLayout>
          </NavigatorIndexContext.Provider>
    );
}
export default ProfilePage;
