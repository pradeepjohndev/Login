import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await axios.post("http://localhost:5000/login", { username, password });
    alert("Login successful");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
