import { useState, useEffect, useCallback } from "react";

const CACHE_KEY = "countryDataCacheTop10";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const useFetchCountryData = (query = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `https://restcountries.com/v3.1/all`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const resData = await res.json();
      if (!Array.isArray(resData)) {
        throw new Error("Invalid data format from API");
      }
      // Sort by population and get top 10
      const top10Data = resData
        .filter((country) => country.population !== undefined) // Ensure population exists
        .sort((a, b) => b.population - a.population)
        .slice(0, 10);
      const cacheData = {
        data: top10Data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      setData(top10Data);
      console.log("Fetched and cached top 10 countries:", top10Data);
    } catch (error) {
      setError(error.message || "Failed to fetch data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data: cachedData, timestamp } = JSON.parse(cached);
         
        if (
          Date.now() - timestamp < CACHE_EXPIRY &&
          Array.isArray(cachedData)
        ) {
          requestAnimationFrame(() => {
            setData(cachedData);
          });
          return;
        } else {
          localStorage.removeItem(CACHE_KEY);
        }
      } catch (error) {
        setError(error.message || "Failed to parse cached data");
        localStorage.removeItem(CACHE_KEY);
      }
    } else {
      fetchData();
    }
  }, [fetchData, query]);

  return { data, error, loading };
};

export default useFetchCountryData;
