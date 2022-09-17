import React, { useContext } from "react";
import { Button, Dropdown, DropdownButton, Form, Nav} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BlogContext } from "../context/BlogContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { BlogContextI } from "../interfaces/BlogContextI";


export const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser,setCurrentUser } = useContext<AuthContextI>(AuthContext);
  const { setQuery,query } = useContext<BlogContextI>(BlogContext);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null as any)
    navigate("/login");
  };
 





const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setQuery(e.currentTarget.value)
}



  return (
    <Nav className="d-flex align-items-center justify-content-between py-2">
      <Link to="/">
      <div className="d-flex gap-3 align-items-center">
      <Nav.Item
          style={{ fontWeight: "bold", fontSize: 20, cursor: "pointer" }}
        >
          BlogIt
        </Nav.Item>
        <Nav.Item>
          <Form.Control id="input" placeholder='search articles' style={{fontSize:14}}
          value={query}
          onChange={handleChange}
          />
        </Nav.Item>
      </div>
      </Link>
      <Nav.Item>
        {currentUser ? (
          <DropdownButton
            id="dropdown-basic-button"
            title={currentUser?.username}
            variant="outline-success"
            size="sm"
          >
            <Link to="/profile">
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Divider />
            </Link>
            <Dropdown.Item onClick={handleLogout} href="#/action-1">
              Logout
            </Dropdown.Item>
          </DropdownButton>
        ) : (
          <Button size="sm" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Nav.Item>
    </Nav>
  );
};
