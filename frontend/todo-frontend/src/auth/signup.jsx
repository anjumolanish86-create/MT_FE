import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";

const Signup = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username,
                password,
                first_name: name,
                email
            };
            await signupUser(payload);
            alert("signup was successful");
            navigate("/login");

        } catch (err) {
            console.log("Signup Error :", err.response?.data);
            alert("signup failed");

        }
    };

    return (
        <div className="container mt-5">
            <h2>Signup</h2>
            <form onSubmit={handleSignup} className="mt-3">
                {/* For Name */}
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control mb-3" placeholder="Name" id="name" value={name}
                    onChange={(e) => setName(e.target.value)} />

                {/* For Email */}
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control mb-3" placeholder="Email" id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                {/* For username */}
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control mb-3" placeholder="Username" id="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                {/* For password */}
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control mb-3" placeholder="Password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />


                <button type="submit" className="btn btn-success w-100">Signup</button>
            </form>
        </div>
    );
}
export default Signup;