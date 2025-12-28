import axiosInstance from "./axios";
import { Template } from "../types/templates";

/* =========================
   Templates CRUD
========================= */

export const fetchTemplatesApi = async (): Promise<Template[]> => {
  const res = await axiosInstance.get("/templates");
  return res.data;
};

export const fetchTemplateApi = async (id: string): Promise<Template> => {
  const res = await axiosInstance.get(`/templates/${id}`);
  return res.data;
};

export const createTemplateApi = async (
  data: Partial<Template>
): Promise<Template> => {
  const res = await axiosInstance.post("/templates", data);
  return res.data;
};

export const updateTemplateApi = async (
  id: string,
  data: Partial<Template>
): Promise<Template> => {
  const res = await axiosInstance.put(`/templates/${id}`, data);
  return res.data;
};

export const deleteTemplateApi = async (id: string) => {
  await axiosInstance.delete(`/templates/${id}`);
  return id;
};

export const toggleTemplateApi = async (id: string): Promise<Template> => {
  const res = await axiosInstance.patch(`/templates/${id}/toggle`);
  return res.data;
};

/* =========================
   Upload Template Image ✅
========================= */

export const uploadTemplateImageApi = async (
  templateId: string,
  file: File
): Promise<Template> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axiosInstance.post(
    `/templates/${templateId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
