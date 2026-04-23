import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

/**
 * Hook to check if a page is visible/active
 * @param {string} pageKey - The page key (e.g., 'about', 'services')
 * @returns {object} - { isActive, showInNavigation, redirectTo, loading }
 */
export const usePageVisibility = (pageKey) => {
  const [visibility, setVisibility] = useState({
    isActive: true,
    showInNavigation: true,
    redirectTo: '',
    loading: true,
  });

  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cms/global-settings`);
        const data = await response.json();

        if (data.success && data.data.pageVisibility) {
          const pageVis = data.data.pageVisibility[pageKey] || {
            isActive: true,
            showInNavigation: true,
            redirectTo: '',
          };

          setVisibility({
            ...pageVis,
            loading: false,
          });
        } else {
          setVisibility(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Error fetching page visibility:', error);
        // Default to visible on error
        setVisibility({
          isActive: true,
          showInNavigation: true,
          redirectTo: '',
          loading: false,
        });
      }
    };

    fetchVisibility();
  }, [pageKey]);

  return visibility;
};

/**
 * Hook to get all page visibility settings
 * @returns {object} - { pageVisibility, loading }
 */
export const useAllPageVisibility = () => {
  const [state, setState] = useState({
    pageVisibility: {},
    loading: true,
  });

  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cms/global-settings`);
        const data = await response.json();

        if (data.success) {
          setState({
            pageVisibility: data.data.pageVisibility || {},
            loading: false,
          });
        } else {
          setState({ pageVisibility: {}, loading: false });
        }
      } catch (error) {
        console.error('Error fetching page visibility:', error);
        setState({ pageVisibility: {}, loading: false });
      }
    };

    fetchVisibility();
  }, []);

  return state;
};
