"use client";
/**
 * Hook for dashboard data operations.
 */
import { useState, useCallback } from "react";
import { dashboardApi, CategoryShares, TopWebsite } from "@/lib/api";

interface UseDashboardDataReturn {
  categoryShares: CategoryShares;
  topWebsites: FormattedTopWebsite[];
  isLoading: boolean;
  fetchCategoryShares: (from: string, to: string) => Promise<void>;
  fetchTopWebsites: (from: string, to: string) => Promise<void>;
}

export interface FormattedTopWebsite {
  site: string;
  category: string;
  time: string;
  visits: number;
  productive: boolean;
}

/**
 * Format milliseconds to human readable time.
 */
function formatTime(ms: number): string {
  if (ms >= 60 * 1000) {
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.round((ms % (60 * 1000)) / 1000);
    return `${minutes}m ${seconds}s`;
  }
  return `${Math.round(ms / 1000)}s`;
}

/**
 * Convert local datetime string to UTC ISO string.
 */
export function toUTCISOString(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  return d.toISOString();
}

/**
 * Get default date range (last 7 days).
 */
export function getDefaultDateRange(): { from: string; to: string } {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return {
    from: weekAgo.toISOString().slice(0, 16),
    to: now.toISOString().slice(0, 16),
  };
}

export function useDashboardData(): UseDashboardDataReturn {
  const [categoryShares, setCategoryShares] = useState<CategoryShares>({});
  const [topWebsites, setTopWebsites] = useState<FormattedTopWebsite[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoryShares = useCallback(async (from: string, to: string) => {
    setIsLoading(true);
    try {
      const data = await dashboardApi.getCategoryShares(
        toUTCISOString(from),
        toUTCISOString(to)
      );
      if (data.success && data.shares) {
        setCategoryShares(data.shares);
      } else {
        setCategoryShares({});
      }
    } catch {
      setCategoryShares({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTopWebsites = useCallback(async (from: string, to: string) => {
    setIsLoading(true);
    try {
      const data = await dashboardApi.getTopWebsites(
        toUTCISOString(from),
        toUTCISOString(to)
      );
      if (data.success && data.top_websites && data.top_websites.length > 0) {
        setTopWebsites(
          data.top_websites.map((site: TopWebsite) => ({
            site: site.url,
            category: "", // Not returned by API
            time: formatTime(site.total_time),
            visits: site.visits,
            productive: false, // Can't determine without category
          }))
        );
      } else {
        setTopWebsites([]);
      }
    } catch {
      setTopWebsites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    categoryShares,
    topWebsites,
    isLoading,
    fetchCategoryShares,
    fetchTopWebsites,
  };
}
