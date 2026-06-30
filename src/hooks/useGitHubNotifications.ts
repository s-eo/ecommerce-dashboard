import { useEffect, useRef } from 'react';
import { useNotifications } from '../components/Notification/NotificationContext';
import { fetchGitHubInfo, type GitHubInfo } from '../services/githubService';

export function useGitHubNotifications(repoOwner: string, repoName: string) {
  const { addNotification } = useNotifications();
  const lastInfoRef = useRef<GitHubInfo | null>(null);

  const checkForUpdates = async () => {
    try {
      // Update environment variables for this check
      import.meta.env.VITE_GITHUB_REPO_OWNER = repoOwner;
      import.meta.env.VITE_GITHUB_REPO_NAME = repoName;

      const currentInfo = await fetchGitHubInfo();

      if (lastInfoRef.current) {
        // Check if version changed
        if (currentInfo.latestVersion !== lastInfoRef.current.latestVersion &&
            currentInfo.latestVersion !== 'No releases') {
          addNotification({
            message: `New version available: ${currentInfo.latestVersion}.
             ${currentInfo.latestBuildMessage}`,
            type: 'info',
          });
        }

        // Check if build changed
        if (currentInfo.latestBuild !== lastInfoRef.current.latestBuild && 
            currentInfo.latestBuild !== 'No commits') {
          addNotification({
            message: `New build available: ${currentInfo.latestBuild}`,
            type: 'success',
          });
        }
      } else {
        // First check - show current info
        if (currentInfo.latestVersion !== 'No releases') {
          addNotification({
            message: `Current version: ${currentInfo.latestVersion}`,
            type: 'info',
          });
        }
        if (currentInfo.latestBuild !== 'No commits') {
          addNotification({
            message: `Current build: ${currentInfo.latestBuild}`,
            type: 'info',
          });
        }
      }

      lastInfoRef.current = currentInfo;
    } catch (error) {
      console.error('Error checking for GitHub updates:', error);
    }
  };

  useEffect(() => {
    // Initial check
    checkForUpdates();

    // Poll every minute (60000 ms)
    const interval = setInterval(checkForUpdates, 60000);

    return () => clearInterval(interval);
  }, [repoOwner, repoName]);
}
