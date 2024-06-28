import { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context";
import { getAllUsers } from "../service/user";
import UserTable from "../components/UserTable";

const AdminUserPage = () => {   
    const [users, setUsers] = useState([]);
    const fetchAndSetUsers = () => {
        getAllUsers().then(res => {
            setUsers(res.items);
        }).catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        fetchAndSetUsers();
    }, []);
    return (
        <NavigatorIndexContext.Provider value={7}>
            <PrivateLayout>
                <UserTable users={users} />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
};
export default AdminUserPage;