import type { Category, Job, ApplicationFormData } from '@/types';
import { apiFetch } from './api';

export const jobService = {
  async getCategories(): Promise<{
    success: boolean;
    data?: Category[] | null;
  }> {
    try {
      const json = await apiFetch<{ data: Category[] }>('/categories');
      return { success: true, data: json.data ?? null };
    } catch {
      return { success: false, data: null };
    }
  },

  /** Fetch jobs with filters and pagination (public API) */
  async getAll(params: {
    search?: string;
    category?: string;
    location?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    success: boolean;
    data?: {
      jobs: Job[];
      pagination: { total: number; page: number; pages: number };
    };
  }> {
    try {
      const sp = new URLSearchParams();
      if (params.search) sp.set('search', params.search);
      if (params.category) sp.set('category', params.category);
      if (params.location) sp.set('location', params.location);
      if (params.page) sp.set('page', String(params.page));
      if (params.limit) sp.set('limit', String(params.limit));
      const query = sp.toString();
      const path = `/jobs${query ? `?${query}` : ''}`;
      const data = await apiFetch<{
        jobs: Job[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(path);
      return {
        success: true,
        data: {
          jobs: data.jobs,
          pagination: {
            total: data.total,
            page: data.page,
            pages: data.pages,
          },
        },
      };
    } catch (e) {
      console.error('jobService.getAll', e);
      return { success: false, data: undefined };
    }
  },

  /** Fetch single job by id (public API) */
  async getOne(id: string): Promise<{ success: boolean; data?: Job }> {
    try {
      const data = await apiFetch<Job>(`/jobs/${id}`);
      return { success: true, data };
    } catch {
      return { success: false, data: undefined };
    }
  },

  /** Featured jobs (from backend; fallback to list if endpoint missing) */
  async getFeatured(): Promise<{ success: boolean; data?: Job[] }> {
    try {
      const json = await apiFetch<{ data: Job[] }>('/jobs/featured');
      return { success: true, data: json.data ?? [] };
    } catch {
      try {
        const list = await this.getAll({ limit: 8 });
        return {
          success: true,
          data: list.data?.jobs ?? [],
        };
      } catch (e) {
        console.error('jobService.getFeatured', e);
        return { success: false, data: [] };
      }
    }
  },

  /** Latest jobs (from backend; fallback to list if endpoint missing) */
  async getLatest(): Promise<{ success: boolean; data?: Job[] }> {
    try {
      const json = await apiFetch<{ data: Job[] }>('/jobs/latest');
      return { success: true, data: json.data ?? [] };
    } catch {
      try {
        const list = await this.getAll({ limit: 8 });
        return {
          success: true,
          data: list.data?.jobs ?? [],
        };
      } catch (e) {
        console.error('jobService.getLatest', e);
        return { success: false, data: [] };
      }
    }
  },
};

export const applicationService = {
  async create(
    payload: ApplicationFormData,
  ): Promise<{ success: boolean; data?: unknown }> {
    const data = await apiFetch<unknown>('/applications', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { success: true, data };
  },
};
