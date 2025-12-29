import { useEffect, useState } from "react";
import axios from "axios";

export default function ss() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => alert("Not logged in"));
  }, []);

  return <h2>{user ? "Welcome user " + user.userId : "Please login"}</h2>;
}
