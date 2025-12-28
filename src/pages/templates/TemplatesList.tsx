import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchTemplates,
  deleteTemplate,
  toggleTemplate,
} from "../../store/templates/templates.thunks";

const TemplatesList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list, loading } = useSelector(
    (state: RootState) => state.templates
  );

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <Page>
      {/* ===== Header ===== */}
      <Header>
        <Title>Templates</Title>

        <Actions>
          <ActionButton to="/templates/new" $variant="primary">
            ➕ Create Template
          </ActionButton>

          <ActionButton to="/templates/import" $variant="ghost">
            ⬆ Import
          </ActionButton>
        </Actions>
      </Header>

      {/* ===== Content ===== */}
      {list.length === 0 ? (
        <Empty>No templates found.</Empty>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Active</th>
              <th>Plugins</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((t) => (
              <tr key={t._id}>
                <td>{t.templateName}</td>

                <td>
                  <input
                    type="checkbox"
                    checked={t.active}
                    onChange={() => dispatch(toggleTemplate(t._id))}
                  />
                </td>

                <td>{t.plugins.join(", ")}</td>

                <td>
                  <RowActions>
                    <Link to={`/templates/${t._id}`}>View</Link>
                    <Link to={`/templates/${t._id}/edit`}>Edit</Link>
                    <button
                      onClick={() => dispatch(deleteTemplate(t._id))}
                    >
                      Delete
                    </button>
                  </RowActions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Page>
  );
};

export default TemplatesList;



const Page = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: #111827;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled(Link)<{ $variant?: "primary" | "ghost" }>`
  padding: 0.55rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;

  ${({ $variant }) =>
    $variant === "primary"
      ? `
        background: #2563eb;
        color: white;

        &:hover {
          background: #1d4ed8;
        }
      `
      : `
        background: #f3f4f6;
        color: #374151;

        &:hover {
          background: #e5e7eb;
        }
      `}
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 0.75rem;
    background: #f9fafb;
    font-size: 0.85rem;
    color: #6b7280;
  }

  td {
    padding: 0.75rem;
    border-top: 1px solid #e5e7eb;
  }
`;

const RowActions = styled.div`
  display: flex;
  gap: 0.5rem;

  a {
    color: #2563eb;
    text-decoration: none;
    font-size: 0.85rem;
  }

  button {
    background: none;
    border: none;
    color: #dc2626;
    cursor: pointer;
    font-size: 0.85rem;
  }
`;

const Loading = styled.p`
  padding: 2rem;
`;

const Empty = styled.p`
  color: #6b7280;
`;
