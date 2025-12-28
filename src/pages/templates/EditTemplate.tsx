import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchTemplate,
  updateTemplate,
  uploadTemplateImage,
} from "../../store/templates/templates.thunks";
import { clearCurrentTemplate } from "../../store/templates/templates.slice";
import { AVAILABLE_PLUGINS } from "../../consts";

import {
  Page,
  Card,
  Field,
  Toggle,
  Save,
  Cancel,
  Actions,
  ImageInput,
  Preview,
  MultiSelect,
  Selected,
  Chip,
  SearchInput,
  Dropdown,
  Group,
  GroupTitle,
  Option,
  Hint,
} from "../../components/ui";
import styled from "styled-components";

const EditTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { current, loading } = useSelector(
    (state: RootState) => state.templates
  );

  const [templateName, setTemplateName] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const allPlugins = AVAILABLE_PLUGINS.flatMap((g) => g.items);
  const getLabelBySlug = (slug: string) =>
    allPlugins.find((p) => p.slug === slug)?.label || slug;

  useEffect(() => {
    if (id) dispatch(fetchTemplate(id));
    return () => void dispatch(clearCurrentTemplate());
  }, [dispatch, id]);

  useEffect(() => {
    if (current) {
      setTemplateName(current.templateName);
      setContent(current.content);
      setSelectedPlugins(current.plugins);
      setActive(current.active);
      if (current.image) {
        setImagePreview(
          `${import.meta.env.VITE_INDEV_API_URL}/storage/templates/${current.image}`
        );
      }
    }
  }, [current]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await dispatch(
        updateTemplate({
          id,
          data: {
            templateName,
            content,
            plugins: selectedPlugins,
            active,
          },
        })
      ).unwrap();

      if (imageFile) {
        await dispatch(
          uploadTemplateImage({
            templateId: id,
            file: imageFile,
          })
        ).unwrap();
      }

      navigate("/templates");
    } catch (err) {
      console.error("Failed to update template", err);
    }
  };

  if (loading || !current) return <p>Loading...</p>;

  return (
    <Page>
      <Card>
        <h1>Edit Template</h1>

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
              {imagePreview && (
                <Preview
                  src={imagePreview}
                  onClick={() => setIsModalOpen(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </ImageInput>
            <Hint>PNG / JPG – optional. Click image to enlarge.</Hint>
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
                      setSelectedPlugins(selectedPlugins.filter((p) => p !== slug))
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
                        item.label.toLowerCase().includes(search.toLowerCase()) &&
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
                              setSelectedPlugins([...selectedPlugins, item.slug]);
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
            <Save type="submit">Update Template</Save>
          </Actions>
        </form>
      </Card>

      {/* Modal لتكبير الصورة */}
      {isModalOpen && imagePreview && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent>
            <img src={imagePreview} alt="Template" />
          </ModalContent>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default EditTemplate;

/* ================= Modal Styles ================= */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90%;

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
`;
