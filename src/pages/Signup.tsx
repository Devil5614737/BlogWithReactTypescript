import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Api from "../api/auth";
import { useImage } from "../hooks/useImage";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [file, setFile] = useState<File>();
  const { url } = useImage(file as File);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!url) return;
    const result = await Api.signup(username, email, password, url);
    if (result.status === 200) {
      setError("")
      setLoading(false);
      navigate("/login");
    }
    if (result.status !== 200) {
      setLoading(false);
      console.log(result.data)
      setError(result.data as string);
    }
  };

  return (
    <div
      className="container"
      style={{ display: "grid", minHeight: "100vh", placeContent: "center" }}
    >
      <p className="text-center" style={{ fontSize: 25, fontFamily: "Lora" }}>
        Signup
      </p>
      <Card style={{ width: 450 }} className="border-0">
        <Form>
        {error && <Form.Text style={{ color: "red" }}>{error}</Form.Text>}
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label style={{ fontSize: 13 }}>Username</Form.Label>
            <Form.Control
            required
              style={{ background: "#F1F1F1", border: "none", fontSize: 14 }}
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.currentTarget.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: 13 }}>Email address</Form.Label>
            <Form.Control
                  required
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
                  required
              style={{ background: "#F1F1F1", border: "none", fontSize: 14 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPofilePic">
            <Form.Label style={{ fontSize: 13 }}>Profile Pic</Form.Label>
            <Form.Control
                  required
              style={{ background: "#F1F1F1", border: "none", fontSize: 14 }}
              type="file"
              placeholder="Password"
              onChange={(event:any) =>
                setFile(event.currentTarget.files[0] )
              }
            />
          </Form.Group>
          <Button
            onClick={handleSignup}
            className="w-100 mb-3 mt-2"
            variant="dark"
            type="submit"
          >
             {loading ? <Spinner animation="border" size="sm" /> : "Signup"}
          </Button>
          <Form.Text>
            Have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "black", cursor: "pointer", fontWeight: 500 }}
            >
              Login
            </span>
          </Form.Text>
        </Form>
      </Card>
    </div>
  );
}

export default Signup;
