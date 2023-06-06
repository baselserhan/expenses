import { expenseReducer } from "./expenses-slices";

const { configureStore } = require("@reduxjs/toolkit");

export const reduxStore = configureStore({ reducer: expenseReducer });
