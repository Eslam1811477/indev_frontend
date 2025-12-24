import { useSelector } from "react-redux";
import styled from "styled-components";
import { isAuthenticated } from "../store/auth/auth.selectors";
import { logout } from "../store/auth/auth.slice";



const Navbar = () => {
  const isAuth = useSelector(isAuthenticated);

  return (
    <Nav>
      <Logo>index</Logo>

      <Actions>
        {isAuth ? (
          <button onClick={() => { logout() }}>Logout</button>
        ) : (
          <button>Login</button>
        )}
      </Actions>
    </Nav>
  );
};

export default Navbar;

/* ================= styles ================= */

const Nav = styled.nav`
  height: 60px;
  background: #111827;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
`;

const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Actions = styled.div`
  button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 6px 14px;
    cursor: pointer;
  }
`;
