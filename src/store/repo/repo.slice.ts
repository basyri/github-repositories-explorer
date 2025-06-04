import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GitHubRepo } from "../../types/github";
import { fetchRepos } from "./repo.action";

interface RepoState {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

const initialState: RepoState = {
  repos: [],
  loading: false,
  error: null,
};

const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<GitHubRepo[]>) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch repos";
      });
  },
});

export default repoSlice.reducer;
