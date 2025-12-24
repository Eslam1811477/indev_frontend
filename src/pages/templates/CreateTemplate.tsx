import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { createTemplate } from "../../store/templates/templates.thunks";

const CreateTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [templateName, setTemplateName] = useState("");
  const [content, setContent] = useState("");
  const [plugins, setPlugins] = useState("");
  const [active, setActive] = useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      createTemplate({
        templateName,
        content,
        plugins: plugins.split(",").map((p) => p.trim()),
        active,
      })
    ).then(() => navigate("/templates"));
  };

  return (
    <div>
      <h1>Create Template</h1>

      <form onSubmit={submit}>
        <input
          placeholder="Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Plugins (comma separated)"
          value={plugins}
          onChange={(e) => setPlugins(e.target.value)}
        />

        <label>
          Active
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateTemplate;
