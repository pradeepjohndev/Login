import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!username || !password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", { username, password });
      setMsg("Registered successfully");
      navigate("/");
    } catch {
      setMsg("Registration failed");
    }
  };

  return (
    <div style={{ width: 300, height: 300, margin: "50px auto", textAlign: "center", backgroundColor: "grey ", padding: "50px"}}>
      <h2 style={{paddingBottom: "30px"}}>Register</h2>

      <input style={{border: "1px solid white"}} placeholder="Username" onChange={e => setUsername(e.target.value)} /><br /><br />
      <input style={{border: "1px solid white"}} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br /><br />

      <button onClick={register}>Register</button>
      <p>
        Already a user? <a href="/">login</a>
      </p>
      <p>{msg}</p>
    </div>
  );
}
