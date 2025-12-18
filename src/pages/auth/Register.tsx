import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import type { RegisterRequest, RegisterResponse } from "../../types/auth";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const Register = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
  });

//   const [{ data, loading, error }, executeRegister] = useAxios<
//     RegisterResponse,
//     RegisterRequest
//   >(
//     {
//       url: "/auth/register",
//       method: "POST",
//     },
//     { manual: true }
//   );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // simple client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    // executeRegister({ data: formData });
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Create Account</h2>

        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter a strong password"
        />

        <Button loading={false} type="submit">
          Register
        </Button>

        {false && <ErrorMsg>Registration failed</ErrorMsg>}
        {false && <SuccessMsg>Registered successfully ✅</SuccessMsg>}
      </FormWrapper>
    </Container>
  );
};

export default Register;

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

const ErrorMsg = styled.p`
  color: #dc2626;
  margin-top: 1rem;
  text-align: center;
`;

const SuccessMsg = styled.p`
  color: #16a34a;
  margin-top: 1rem;
  text-align: center;
`;
