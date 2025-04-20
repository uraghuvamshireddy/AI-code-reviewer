import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
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
        <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
          <h2 style={{ marginBottom: '20px' }}>Sign in with Google</h2>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            
            width="240"
            theme = "outline"
            size='medium'
            shape='pill'
          />
        </div>
      </GoogleOAuthProvider>
    );

};

export default Login;