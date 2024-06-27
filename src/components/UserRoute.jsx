import { useNavigate } from 'react-router-dom';
import { UserContext } from '../lib/Context';
import { getMe } from '../service/user';
import { useEffect, useState } from 'react';

const UserRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getMe().then(user => {
            setUser(user);
        }).catch(e => {
            navigate("/login");
        });
    }, [navigate]);

    if(user == null) {
        return <></>;
    }
    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>;
};

export default UserRoute;