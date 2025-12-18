import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <Body>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Body>
    </Wrapper>
  );
};

export default DashboardLayout;

/* ================= styles ================= */

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
`;

const Content = styled.main`
  flex: 1;
  padding: 1.5rem;
  background: #f5f6fa;
`;
