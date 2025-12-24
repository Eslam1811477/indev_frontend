import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTemplatesApi,
  fetchTemplateApi,
  createTemplateApi,
  updateTemplateApi,
  deleteTemplateApi,
  toggleTemplateApi,
} from "../../api/templates.api";

export const fetchTemplates = createAsyncThunk(
  "templates/fetchAll",
  async () => await fetchTemplatesApi()
);

export const fetchTemplate = createAsyncThunk(
  "templates/fetchOne",
  async (id: string) => await fetchTemplateApi(id)
);

export const createTemplate = createAsyncThunk(
  "templates/create",
  async (data: any) => await createTemplateApi(data)
);

export const updateTemplate = createAsyncThunk(
  "templates/update",
  async ({ id, data }: { id: string; data: any }) =>
    await updateTemplateApi(id, data)
);

export const deleteTemplate = createAsyncThunk(
  "templates/delete",
  async (id: string) => await deleteTemplateApi(id)
);

export const toggleTemplate = createAsyncThunk(
  "templates/toggle",
  async (id: string) => await toggleTemplateApi(id)
);
