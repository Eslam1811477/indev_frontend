import { useState } from "react";
import styled from "styled-components";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useLogin } from "../../auth/func";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending, error } = useLogin();


  const handleSubmit = () => {
    login({
      email: "test@test.com",
      password: "123456",
    });
  };

  return (
    <Container>
      <FormWrapper>
          <WelcomeText>Welcome to indev</WelcomeText>

        <h2>Login</h2>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <Button type="button" onClick={()=>{handleSubmit()}}>{isPending?'Loading...':'LogIn'}</Button>
      </FormWrapper>
    </Container>
  );
};

export default Login;

/* ================= Styled Components ================= */
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: #111827;
  }
`;

const WelcomeText = styled.p`
  text-align: center;
  color: #474747;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

