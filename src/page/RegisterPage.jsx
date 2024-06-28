import '../css/LoginPage.css';
import { BasicLayout} from "../components/Layout";
import { useNavigate } from 'react-router';
import { useOkHandler } from '../hooks/useOkHandler';
import { useErrorHandler } from '../hooks/useErrorHandler';
import RegisterForm from '../components/RegisterForm';
const RegisterPage = () => {
    const navigate = useNavigate();
    const handleRegisterOk = (message) => {
        console.log(message);
        messageOk('注册成功');
        navigate('/login');
    }
    const handleRegisterError = (message) => {
        console.log(message);
        messageError(message);
    }
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();
    return (
            <BasicLayout>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' , flexGrow: 1}}>
                    <RegisterForm
                        title="Book Store"
                        userLabel="账号"
                        passwordLabel="密码"
                        repeatPasswordLabel="重复密码"
                        emailLabel="邮箱"
                        registerButtonText="注册"
                        onRegisterOk={handleRegisterOk}
                        onRegisterError={handleRegisterError}
                    />
                </div>
                <OkSnackbar />
                <ErrorSnackbar />
            </BasicLayout>
    );
};


export default RegisterPage;