import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GitHubRepo } from "../../types/github";
import api from "../../lib/axios";

export const fetchRepos = createAsyncThunk<GitHubRepo[], string>(
  "repos/fetch",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await api.get<GitHubRepo[]>(`/users/${username}/repos`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch repos");
    }
  }
);
