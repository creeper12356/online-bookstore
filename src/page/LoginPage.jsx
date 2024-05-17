import '../css/LoginPage.css';
import {BasicLayout} from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { useNavigate } from 'react-router';
import { useOkHandler } from '../hooks/useOkHandler';
import { useErrorHandler } from '../hooks/useErrorHandler';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLoginOk = (message) => {
        console.log(message);
        messageOk('登录成功');
        navigate('/');
    }
    const handleLoginError = (message) => {
        console.log(message);
        messageError(message);
    }
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();
    return (
            <BasicLayout>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' , flexGrow: 1}}>
                    <LoginForm
                        title="Book Store"
                        userLabel="账号"
                        passwordLabel="密码"
                        loginButtonText="登录"
                        onLoginOk={handleLoginOk}
                        onLoginError={handleLoginError}
                    />
                </div>
                <OkSnackbar />
                <ErrorSnackbar />
            </BasicLayout>
    );
};
export default LoginPage;
