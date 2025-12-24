export interface Template {
  _id: string;
  templateName: string;
  content: string;
  plugins: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
