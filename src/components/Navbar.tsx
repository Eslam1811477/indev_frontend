import styled from "styled-components";

const Navbar = () => {
  const isAuthenticated = true; // مؤقتًا

  return (
    <Nav>
      <Logo>index</Logo>

      <Actions>
        {isAuthenticated ? (
          <button>Logout</button>
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
