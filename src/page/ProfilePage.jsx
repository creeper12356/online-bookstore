import { useContext, useEffect, useState } from "react";
import { banUser, getMe, getUserProfile, unbanUser, updateUserInfo } from "../service/user";
import { Button } from "@mui/material";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext, UserContext } from "../lib/Context";
import UserProfile from "../components/UserProfile";

import '../css/ProfilePage.css';
import { logout } from "../service/auth";
import { useParams } from "react-router";
import { useOkHandler } from "../hooks/useOkHandler";
import UserEditForm from "../components/UserEditForm";
import { useErrorHandler } from "../hooks/useErrorHandler";

const ProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const currentUser = useContext(UserContext);
    const [isMe, setIsMe] = useState(false);
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const getUser = () => {
        getUserProfile(userId)
            .then(user => {
                setUser(user);
            })
            .catch(e => { console.log(e); });
    }
    useEffect(() => {
        getUser();
    }, []);
    useEffect(() => {
        setIsMe(Number(userId) === currentUser.id);
    }, [currentUser, userId]);


    return (
        <NavigatorIndexContext.Provider value={0}>
            <PrivateLayout>
                <div className="profile-page-container">
                    <div style={{ alignSelf: 'flex-end', display: 'flex', gap: 10 }}>
                        {currentUser.isAdmin && !isMe ? <Button
                            variant="contained"
                            color={user.isBanned ? 'error' : 'primary'}
                            onClick={user.isBanned ? () => {
                                unbanUser(user.id).then(res => {
                                    setUser({ ...user, isBanned: false });
                                    messageOk(res.message);
                                }).catch(e => {
                                    console.log(e);
                                });
                            } : () => {
                                banUser(user.id).then(res => {
                                    setUser({ ...user, isBanned: true });
                                    messageOk(res.message);
                                }).catch(e => {
                                    console.log(e);
                                });
                            }}
                        >
                            {user.isBanned ? '解禁' : '封禁'}
                        </Button> : ''}
                        {isMe ? <Button
                            variant="outlined"
                            href="/login"
                            onClick={async () => {
                                await logout();
                            }}
                        >
                            登出
                        </Button> : ''}
                    </div>
                    <OkSnackbar />
                    <ErrorSnackbar />
                    <UserProfile
                        user={user}
                        isMe={isMe}
                        onProfileEdit={() => {
                            setIsEditOpen(true);
                        }}
                        onAvatarChange={(avatar) => {
                            updateUserInfo({ ...user, avatar }).then(res => {
                                messageOk(res.message);
                                setUser({ ...user, avatar });
                            }).catch(e => {
                                messageError(e.message);
                            });
                        }}
                    />
                </div>
                <UserEditForm
                    user={user}
                    open={isEditOpen}
                    onClose={() => {
                        setIsEditOpen(false);
                    }}
                    onSubmit={(submitUser) => {
                        updateUserInfo(submitUser).then(res => {
                            messageOk(res.message);
                            setUser({ ...user, username: submitUser.username, email: submitUser.email })
                        }).catch(e => {
                            messageError(e.message);
                        })
                        setIsEditOpen(false);
                    }}
                />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
}
export default ProfilePage;
