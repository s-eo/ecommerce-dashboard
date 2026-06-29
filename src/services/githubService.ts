interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export interface GitHubInfo {
  latestVersion: string;
  latestBuild: string;
  lastChecked: Date;
}

const GITHUB_REPO_OWNER = import.meta.env.VITE_GITHUB_REPO_OWNER || 'your-username';
const GITHUB_REPO_NAME = import.meta.env.VITE_GITHUB_REPO_NAME || 'your-repo';

export async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn('No releases found for this repository');
        return null;
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching latest release:', error);
    return null;
  }
}

export async function fetchLatestCommit(): Promise<GitHubCommit | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/commits?per_page=1`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    const commits = await response.json();
    return commits[0] || null;
  } catch (error) {
    console.error('Error fetching latest commit:', error);
    return null;
  }
}

export async function fetchGitHubInfo(): Promise<GitHubInfo> {
  const [release, commit] = await Promise.all([
    fetchLatestRelease(),
    fetchLatestCommit(),
  ]);

  return {
    latestVersion: release?.tag_name || 'No releases',
    latestBuild: commit?.sha.substring(0, 7) || 'No commits',
    lastChecked: new Date(),
  };
}
