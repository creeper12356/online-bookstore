import { useNavigate } from 'react-router-dom';
import { UserContext } from '../lib/Context';
import { useEffect, useState } from 'react';
import { getMe } from '../service/user';

const AdminRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getMe().then(user => {
            if (!user.isAdmin) {
                throw new Error("Unauthorized");
            }
            setUser(user);
        }).catch(e => {
            navigate("/login");
        });
    }, [navigate]);

    return user ? <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider> : <></>
};

export default AdminRoute;