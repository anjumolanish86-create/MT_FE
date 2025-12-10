import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Note: Ensuring payload uses 'email' as requested. 
            // Backend must be updated to accept 'email' instead of 'username'.
            const res = await loginUser({ email, password });

            localStorage.setItem("access", res.data.tokens.access);
            localStorage.setItem("refresh", res.data.tokens.refresh);

            alert("login was successful");
            navigate("/todo");

        } catch (err) {
            alert("Invalid credentials login failed");

        }
    };
    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mt-3">
                    {/* For email */}
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control mb-3" placeholder="Email" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    {/* For password */}
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control mb-3" placeholder="Password" id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />


                    <button type="submit" className="btn btn-success w-100">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
