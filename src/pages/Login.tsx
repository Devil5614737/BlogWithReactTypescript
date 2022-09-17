import React, { useContext, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Api from "../api/auth";
import jwtDecoder from "jwt-decode";
import { CurrentUserI } from "../interfaces/User";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";

function Login() {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useContext<AuthContextI>(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (event: any) => {
    setLoading(true);
    event.preventDefault();

    const result = await Api.login(email, password);
    if (result.status === 200) {
      setLoading(false);
      localStorage.setItem("token", result.data as string);
      const decoded = jwtDecoder(result.data as string);
      setCurrentUser(decoded as CurrentUserI);
      setError("");
      navigate("/");
    }
    if (result.status !== 200) {
      setLoading(false);
      setError(result.data as string);
    }
  };

  return (
    <div
      className="container  "
      style={{ display: "grid", minHeight: "100vh", placeContent: "center" }}
    >
      <p className="text-center" style={{ fontSize: 25, fontFamily: "Lora" }}>
        Login
      </p>
      <Card style={{ width: 450 }} className="border-0">
        <Form>
          {error && <Form.Text style={{ color: "red" }}>{error}</Form.Text>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: 13 }}>Email address</Form.Label>
            <Form.Control
              style={{ background: "#F1F1F1", border: "none", fontSize: 14 }}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.currentTarget.value)
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontSize: 13 }}>Password</Form.Label>
            <Form.Control
              style={{ background: "#F1F1F1", border: "none", fontSize: 14 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)
              }
            />
          </Form.Group>
          <Button
            onClick={handleLogin}
            className="w-100 mb-3 mt-2"
            variant="dark"
            type="submit"
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}{" "}
          </Button>
          <Form.Text>
            Don't have an account?{" "}
            <span
            className='link'
              onClick={() => navigate("/signup")}
              style={{ color: "black", cursor: "pointer", fontWeight: 500 }}
            >
              Signup
            </span>
          </Form.Text>
          
          <br />
          <Form.Text
          className='link' onClick={()=>navigate('/')} style={{cursor:'pointer'}}>
          continue without login
          
          </Form.Text>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
