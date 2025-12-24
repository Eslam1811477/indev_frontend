import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchTemplate,
  updateTemplate,
} from "../../store/templates/templates.thunks";
import { clearCurrentTemplate } from "../../store/templates/templates.slice";

const EditTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { current, loading } = useSelector(
    (state: RootState) => state.templates
  );

  const [templateName, setTemplateName] = useState("");
  const [content, setContent] = useState("");
  const [plugins, setPlugins] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (id) dispatch(fetchTemplate(id));

    return () => {
      dispatch(clearCurrentTemplate());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (current) {
      setTemplateName(current.templateName);
      setContent(current.content);
      setPlugins(current.plugins.join(", "));
      setActive(current.active);
    }
  }, [current]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    dispatch(
      updateTemplate({
        id,
        data: {
          templateName,
          content,
          plugins: plugins.split(",").map((p) => p.trim()),
          active,
        },
      })
    ).then(() => navigate("/templates"));
  };

  if (loading || !current) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Template</h1>

      <form onSubmit={submit}>
        <input value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <input value={plugins} onChange={(e) => setPlugins(e.target.value)} />

        <label>
          Active
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTemplate;
