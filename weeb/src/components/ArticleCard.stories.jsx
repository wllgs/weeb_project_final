import { MemoryRouter } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const sampleArticle = {
  id: 1,
  title: "Construire une API propre",
  content:
    "Voici un extrait d'article qui montre comment structurer une API REST scalable avec Django.",
  created_at: "2025-03-01T12:00:00Z",
  is_published: true,
};

export default {
  title: "Components/ArticleCard",
  component: ArticleCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Published = {
  args: {
    article: sampleArticle,
  },
};

export const Draft = {
  args: {
    article: { ...sampleArticle, id: 2, is_published: false },
    draftLabel: "Brouillon (vous)",
  },
};
