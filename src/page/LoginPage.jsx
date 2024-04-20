import '../css/LoginPage.css';
import {BasicLayout} from "../components/Layout";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return (
            <BasicLayout>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' , flexGrow: 1}}>
                    <LoginForm
                        title="Book Store"
                        userLabel="账号"
                        passwordLabel="密码"
                        loginButtonText="登录"
                    />
                </div>

            </BasicLayout>
    );
};
export default LoginPage;
