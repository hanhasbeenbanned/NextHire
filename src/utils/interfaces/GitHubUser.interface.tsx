export interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string | null;
    location?: string | null;
    email?: string | null;
    company?: string | null;
  }