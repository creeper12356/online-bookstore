import '../App.css'
const LoginForm = () => {
    return (
        <form
            className="login-form"
        >
            <h1>电子书店</h1>
            <input
                type="text"
                placeholder="用户名"
            />
            <input
                type="password"
                placeholder="密码"
            />
            <div className="option-container">
                <div className="remember-container">
                    <label>
                        <input
                            type="checkbox"
                        />
                        记住密码
                    </label>
                </div>
                <div className="forget-container">
                    忘记密码？
                </div>
            </div>

            <button
                className="btn"
            >
                登录
            </button>
        </form>
    );
};

export default LoginForm;
