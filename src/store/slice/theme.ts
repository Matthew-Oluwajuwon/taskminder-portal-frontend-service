/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: localStorage.getItem("theme") },
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.value = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer