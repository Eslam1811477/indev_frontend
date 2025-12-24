import { createSlice } from "@reduxjs/toolkit";
import { Template } from "../../types/templates";
import {
  fetchTemplates,
  fetchTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleTemplate,
} from "./templates.thunks";

interface TemplatesState {
  list: Template[];
  current: Template | null;
  loading: boolean;
  error: string | null;
}

const initialState: TemplatesState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    clearCurrentTemplate: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      // Fetch One
      .addCase(fetchTemplate.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      // Create
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateTemplate.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })

      // Toggle
      .addCase(toggleTemplate.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })

      // Delete
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearCurrentTemplate } = templatesSlice.actions;
export default templatesSlice.reducer;
