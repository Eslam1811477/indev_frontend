import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

    useEffect(() => {
        console.log(list)
    }, [list])
    

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Templates</h1>

            <Link to="/templates/new">➕ Create Template</Link>

            {list.length === 0 ? (
                <p>No templates found.</p>
            ) : (
                <table>
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
                                    <Link to={`/templates/${t._id}`}>View</Link>{" "}
                                    <Link to={`/templates/${t._id}/edit`}>Edit</Link>{" "}
                                    <button
                                        onClick={() => dispatch(deleteTemplate(t._id))}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TemplatesList;
