import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchTemplate } from "../../store/templates/templates.thunks";

const ViewTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { current, loading } = useSelector(
    (state: RootState) => state.templates
  );

  useEffect(() => {
    if (id) dispatch(fetchTemplate(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (!current) return <p>Template not found</p>;

  return (
    <div>
      <h1>{current.templateName}</h1>

      <p>
        <strong>Status:</strong> {current.active ? "Active" : "Inactive"}
      </p>

      <p>
        <strong>Plugins:</strong> {current.plugins.join(", ")}
      </p>

      <hr />

      <div>
        <h3>Content</h3>
        <pre>{current.content}</pre>
      </div>

      <Link to={`/templates/${current._id}/edit`}>Edit</Link>
    </div>
  );
};

export default ViewTemplate;
