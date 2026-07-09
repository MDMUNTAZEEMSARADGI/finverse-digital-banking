import { createSlice } from "@reduxjs/toolkit";

import { fetchStatement } from "./statementThunk";

import type {
  Statement,
} from "../types/statement.types";

interface StatementState {
  statement: Statement | null;

  loading: boolean;

  error: string | null;
}

const initialState: StatementState = {
  statement: null,

  loading: false,

  error: null,
};

const statementSlice = createSlice({
  name: "statements",

  initialState,

  reducers: {},

  extraReducers(builder) {
    builder

      .addCase(fetchStatement.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(
        fetchStatement.fulfilled,
        (state, action) => {
          state.loading = false;

          state.statement =
            action.payload.statement;
        }
      )

      .addCase(
        fetchStatement.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload as string;
        }
      );
  },
});

export default statementSlice.reducer;