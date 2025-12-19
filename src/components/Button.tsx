import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, loading, ...props }: ButtonProps) => (
  <StyledButton {...props} disabled={loading}>
    {loading ? "Loading..." : children}
  </StyledButton>
);

export default Button;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #3d3d3d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #1b1b1b;
  }
`;
