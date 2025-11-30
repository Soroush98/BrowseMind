/**
 * Dashboard API - analytics and data endpoints.
 */
import { apiClient } from "./client";

export interface CategoryShares {
  [category: string]: number;
}

export interface SharesResponse {
  success: boolean;
  shares?: CategoryShares;
}

export interface TopWebsite {
  url: string;
  total_time: number;
  visits: number;
}

export interface TopWebsitesResponse {
  success: boolean;
  top_websites?: TopWebsite[];
}

export const dashboardApi = {
  /**
   * Get category shares for a date range.
   */
  getCategoryShares: (from: string, to: string): Promise<SharesResponse> =>
    apiClient.post<SharesResponse>("/api/selector/", { from, to }),

  /**
   * Get top websites for a date range.
   */
  getTopWebsites: (from: string, to: string): Promise<TopWebsitesResponse> =>
    apiClient.post<TopWebsitesResponse>("/api/top_websites/", { from, to }),
};
