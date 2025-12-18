import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <Wrapper>
      <NavItem to="/">Dashboard</NavItem>
      <NavItem to="/users">Users</NavItem>
    </Wrapper>
  );
};

export default Sidebar;

/* ================= styles ================= */

const Wrapper = styled.aside`
  width: 220px;
  background: #1f2937;
  padding: 1rem;
  color: white;
`;

const NavItem = styled(NavLink)`
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 0.5rem;

  &.active {
    background: #2563eb;
  }
`;
