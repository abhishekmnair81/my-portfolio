import { useState, useEffect, useCallback } from 'react';
import client, { MOCK_ABOUT, MOCK_SKILLS, MOCK_PROJECTS, MOCK_EXPERIENCE } from '../utils/api';

const getMockData = (endpoint) => {
  if (endpoint.includes('about')) return MOCK_ABOUT;
  if (endpoint.includes('skills')) return MOCK_SKILLS;
  if (endpoint.includes('projects')) return MOCK_PROJECTS;
  if (endpoint.includes('experience')) return MOCK_EXPERIENCE;
  return null;
};

export default function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const fetchData = useCallback(async (forceDemo = false) => {
    setLoading(true);
    setError(null);

    if (forceDemo) {
      // Simulate network delay for skeleton loaders
      setTimeout(() => {
        setData(getMockData(endpoint));
        setLoading(false);
        setIsDemoMode(true);
      }, 500);
      return;
    }

    try {
      const response = await client.get(endpoint);
      setData(response.data);
      setIsDemoMode(false);
      setLoading(false);
    } catch (err) {
      console.warn(`API call failed for ${endpoint}: ${err.message}`);
      setError(err);
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadDemoData = () => {
    fetchData(true);
  };

  return { data, loading, error, retry: () => fetchData(false), loadDemoData, isDemoMode };
}
