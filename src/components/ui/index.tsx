// components/ui.tsx
import styled from "styled-components";

/* ================= Page Layout ================= */
export const Page = styled.div`
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Header = styled.div`
  margin-bottom: 1.5rem;

  h1 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
  }

  p {
    margin-top: 0.25rem;
    color: #6b7280;
    font-size: 0.9rem;
  }
`;

export const Card = styled.div`
  background: white;
  padding: 1.75rem;
  border-radius: 14px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;

/* ================= Form Fields ================= */
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;

  label {
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 0.35rem;
    color: #374151;
  }

  input,
  textarea {
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #2563eb;
    }
  }

  textarea {
    resize: vertical;
  }
`;

export const Hint = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

/* ================= Multi-Select ================= */
export const MultiSelect = styled.div`
  position: relative;
`;

export const Selected = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.45rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

export const Chip = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  font-size: 0.85rem;
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

export const Group = styled.div`
  padding: 0.25rem 0;
`;

export const GroupTitle = styled.div`
  padding: 0.35rem 0.65rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
`;

export const Option = styled.div`
  padding: 0.45rem 0.65rem;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

/* ================= Image Upload ================= */
export const ImageInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input[type="file"] {
    font-size: 0.85rem;
  }
`;

export const Preview = styled.img`
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

/* ================= Toggle ================= */
export const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 0.9rem;

  input {
    width: 16px;
    height: 16px;
  }
`;

/* ================= Actions ================= */
export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const Save = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.55rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }
`;

export const Cancel = styled.button`
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.55rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;
