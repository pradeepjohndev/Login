import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        if (!username || !password) {
            setMsg("please enter username and password");
            return;
        }

        try {
            await axios.post("http://localhost:5000/login", { username, password });
            setMsg("login successful");
            navigate("/dashboard");
        } catch {
            setMsg("login failed");
        }
    };


    return (
        <div style={{ width: 300, height: 300, margin: "50px auto", textAlign: "center", backgroundColor: "grey "}}>
            <h1 className="p-10 ">Login</h1>

            <input style={{border: "1px solid white"}} value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" /><br /><br />
            <input style={{border: "1px solid white"}} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><br /><br />

            <button onClick={login}>Login</button>
            <p>{msg}</p>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}
