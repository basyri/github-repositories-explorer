import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GitHubUser, GitHubUserSearchResponse } from "../../types/github";
import api from "../../lib/axios";

export const fetchUsers = createAsyncThunk<GitHubUser[], string>(
  "users/fetch",
  async (query: string, { rejectWithValue }) => {
    try {
      const res = await api.get<GitHubUserSearchResponse>(
        `/search/users?q=${query}+in:login`
      );
      return res.data.items.slice(0, 5);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);
