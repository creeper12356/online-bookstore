import '../css/LoginPage.css';
import {BasicLayout} from "../components/Layout";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return (
            <BasicLayout>
                <LoginForm
                    title="Book Store"
                    userLabel="账号"
                    passwordLabel="密码"
                    loginButtonText="登录"
                />
            </BasicLayout>
    );
};
export default LoginPage;
