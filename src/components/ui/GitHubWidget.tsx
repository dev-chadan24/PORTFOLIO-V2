import { useEffect, useState } from "react";
import { Github, Star, GitFork, ExternalLink, Clock } from "lucide-react";

interface GitHubWidgetProps {
  repoPath: string; // e.g. "Pritam-Pattanaik/journal"
}

interface RepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export function GitHubWidget({ repoPath }: GitHubWidgetProps) {
  const [data, setData] = useState<RepoData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repoPath}`)
      .then((res) => {
        if (!res.ok) throw new Error("Repo not found");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setError(true));
  }, [repoPath]);

  // Fallback to a simple link if the API errors (e.g. rate limit, or repo is private)
  if (error || !data) {
    return (
      <a
        href={`https://github.com/${repoPath}`}
        target="_blank"
        rel="noreferrer"
        className="quick-pill inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-[13px] text-text-muted hover:text-text hover:border-accent/50 transition-colors"
      >
        <Github className="w-3.5 h-3.5" />
        <span>View on GitHub</span>
        <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-50" />
      </a>
    );
  }

  const updatedDate = new Date(data.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={data.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block w-full max-w-sm rounded-2xl border border-border/60 bg-surface/40 p-4 hover:bg-surface/80 hover:border-accent/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elevated text-text">
          <Github className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-medium text-text group-hover:text-accent transition-colors flex items-center gap-1.5">
            {data.name}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
          </div>
          <div className="text-xs text-text-muted font-mono">{repoPath}</div>
        </div>
      </div>
      
      <p className="text-[13px] text-text-muted mb-4 line-clamp-2 leading-relaxed">
        {data.description || "No description provided."}
      </p>

      <div className="flex items-center gap-4 text-xs text-text-subtle font-medium">
        {data.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>{data.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" />
          <span>{data.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitFork className="w-3.5 h-3.5" />
          <span>{data.forks_count}</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <Clock className="w-3 h-3 opacity-70" />
          <span className="opacity-70">{updatedDate}</span>
        </div>
      </div>
    </a>
  );
}
