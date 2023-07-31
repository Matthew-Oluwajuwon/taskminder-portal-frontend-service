/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { State } from "../../models/application/state"
import { Payload } from "../../models/application/payload"

const initialState: State.AppState = {
  
}

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setGlobalState: (state, action: PayloadAction<Payload.Global>) => {
      const key: keyof State.AppState = action.payload.key
      state = {
        ...state,
        [key]: action.payload?.value,
      }
      return state
    },
    setAllGlobalState(state, action: PayloadAction<State.AppState>) {
      state = action.payload as any
      return state
    },
  },
})

export const { setAllGlobalState, setGlobalState } = globalSlice.actions

export const globalReducer = globalSlice.reducer
