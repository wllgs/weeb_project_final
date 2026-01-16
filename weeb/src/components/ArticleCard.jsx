import { Link } from "react-router-dom";

const formatDate = (isoString) => {
  if (!isoString) return "Date inconnue";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }
  return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
};

export default function ArticleCard({ article, draftLabel = "Brouillon", linkTo }) {
  const target = linkTo || `/articles/${article.id}`;
  return (
    <Link to={target} className="block">
      <article
        className="bg-[#1E1E3F] rounded-2xl p-6 border border-purple-500/40 shadow-lg hover:border-purple-400 transition"
        data-testid={`article-card-${article.id}`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h2 className="text-2xl font-semibold">{article.title}</h2>
          <span className="text-sm text-gray-400">{formatDate(article.created_at)}</span>
        </div>
        <p className="text-gray-300 leading-relaxed">
          {article.content.length > 240 ? `${article.content.slice(0, 240)}...` : article.content}
        </p>
        {!article.is_published && (
          <span className="inline-block mt-4 text-xs uppercase tracking-wide text-yellow-300">
            {draftLabel}
          </span>
        )}
      </article>
    </Link>
  );
}
