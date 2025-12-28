export interface Template {
  _id: string;
  templateName: string;
  content: string;
  plugins: string[];
  active: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
