import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Login = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <div className="login-left">
          <h1>Welcome to CodeReview AI</h1>
          <p>Get intelligent code reviews, improve your coding style, and store your snippets. Built with ❤️ using MERN & AI.</p>
          <div className="fadein">
            <p>✨ Syntax highlighting</p>
            <p>📂 File saving & history</p>
            <p>🧠 Smart code feedback</p>
            <p>🔐 Secure login via Google</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-box">
            <h2>Sign in to get started</h2>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log("Login Failed")}
              theme="outline"
              size="large"
              shape="pill"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
