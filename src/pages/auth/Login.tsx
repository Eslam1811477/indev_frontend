import { useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { login } from "../../store/auth/auth.thunks";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Submit login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => navigate("/")) // Redirect on success
      .catch(() => {
        // error will be handled by toast
      });
  };

  // Show toast on error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [error]);

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
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

        <Button type="submit">{loading ? "Loading..." : "LogIn"}</Button>
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

const FormWrapper = styled.form`
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
