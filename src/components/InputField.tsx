import styled from "styled-components";
import type { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField = ({ label, ...props }: InputProps) => (
  <Wrapper>
    <label>{label}</label>
    <input {...props} />
  </Wrapper>
);

export default InputField;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  input {
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: #7c7c7c;
      box-shadow: 0 0 0 2px rgba(83, 83, 83, 0.2);
    }
  }
`;
