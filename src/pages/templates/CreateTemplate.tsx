import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import type { AppDispatch } from "../../store";
import {
  createTemplate,
  uploadTemplateImage,
} from "../../store/templates/templates.thunks";
import { AVAILABLE_PLUGINS } from "../../consts";

const CreateTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [templateName, setTemplateName] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const allPlugins = AVAILABLE_PLUGINS.flatMap((g) => g.items);
  const getLabelBySlug = (slug: string) =>
    allPlugins.find((p) => p.slug === slug)?.label || slug;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create template
      const template = await dispatch(
        createTemplate({
          templateName,
          content,
          plugins: selectedPlugins,
          active,
        })
      ).unwrap();

      // 2️⃣ Upload image if exists
      if (imageFile) {
        await dispatch(
          uploadTemplateImage({
            templateId: template._id,
            file: imageFile,
          })
        ).unwrap();
      }

      navigate("/templates");
    } catch (err) {
      console.error("Failed to create template", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Header>
        <h1>Create Template</h1>
        <p>Define template content, plugins and image</p>
      </Header>

      <Card>
        <form onSubmit={submit}>
          {/* Template Name */}
          <Field>
            <label>Template Name</label>
            <input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Welcome Email"
              required
            />
          </Field>

          {/* Content */}
          <Field>
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Template content here..."
              rows={6}
              required
            />
          </Field>

          {/* Image Upload */}
          <Field>
            <label>Template Image</label>

            <ImageInput>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
              {imagePreview && <Preview src={imagePreview} />}
            </ImageInput>

            <Hint>PNG / JPG – optional</Hint>
          </Field>

          {/* Plugins */}
          <Field>
            <label>Plugins</label>

            <MultiSelect>
              <Selected>
                {selectedPlugins.map((slug) => (
                  <Chip
                    key={slug}
                    onClick={() =>
                      setSelectedPlugins(
                        selectedPlugins.filter((p) => p !== slug)
                      )
                    }
                  >
                    {getLabelBySlug(slug)} ✕
                  </Chip>
                ))}

                <SearchInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search plugins..."
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                />
              </Selected>

              {isFocused && (
                <Dropdown>
                  {AVAILABLE_PLUGINS.map((group) => {
                    const filteredItems = group.items.filter(
                      (item) =>
                        item.label
                          .toLowerCase()
                          .includes(search.toLowerCase()) &&
                        !selectedPlugins.includes(item.slug)
                    );

                    if (!filteredItems.length) return null;

                    return (
                      <Group key={group.group}>
                        <GroupTitle>{group.group}</GroupTitle>
                        {filteredItems.map((item) => (
                          <Option
                            key={item.slug}
                            onMouseDown={() => {
                              setSelectedPlugins([
                                ...selectedPlugins,
                                item.slug,
                              ]);
                              setSearch("");
                            }}
                          >
                            {item.label}
                          </Option>
                        ))}
                      </Group>
                    );
                  })}
                </Dropdown>
              )}
            </MultiSelect>

            <Hint>Select one or more plugins</Hint>
          </Field>

          {/* Active */}
          <Toggle>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <span>Active</span>
          </Toggle>

          {/* Actions */}
          <Actions>
            <Cancel type="button" onClick={() => navigate("/templates")}>
              Cancel
            </Cancel>
            <Save type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Template"}
            </Save>
          </Actions>
        </form>
      </Card>
    </Page>
  );
};

export default CreateTemplate;


/* ================= Page Layout ================= */
const Page = styled.div`
  max-width: 720px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
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

const Card = styled.div`
  background: white;
  padding: 1.75rem;
  border-radius: 14px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;

/* ================= Form Fields ================= */
const Field = styled.div`
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

const Hint = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

/* ================= Multi-Select ================= */
const MultiSelect = styled.div`
  position: relative;
`;

const Selected = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.45rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const Chip = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  font-size: 0.85rem;
`;

const Dropdown = styled.div`
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

const Group = styled.div`
  padding: 0.25rem 0;
`;

const GroupTitle = styled.div`
  padding: 0.35rem 0.65rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
`;

const Option = styled.div`
  padding: 0.45rem 0.65rem;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

/* ================= Image Upload ================= */
const ImageInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input[type="file"] {
    font-size: 0.85rem;
  }
`;

const Preview = styled.img`
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

/* ================= Toggle ================= */
const Toggle = styled.label`
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
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const Save = styled.button`
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

const Cancel = styled.button`
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

