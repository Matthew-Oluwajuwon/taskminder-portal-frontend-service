/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { State } from "../../models/application/state"
import { ApiRequest } from "../../models/client/request"
import { Payload } from "../../models/application/payload"

const initialState: State.Auth = {
  request: new ApiRequest.Auth(),
  showPassword: false,
  isPasswordLength: false,
  isUpperCase: false,
  isLowerCase: false,
  hasNumber: false,
  isSpecialChar: false,
  postUrl: ""
}

const authSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Payload.Auth>) => {
        const key: keyof State.Auth = action.payload.key;
        state = {
          ...state,
          [key]: action.payload.value,
        };
        return state;
      },
      setField: (state, action) => {
        state = {
          ...state,
          request: {
            ...state.request,
            [action.payload.key]: action.payload.value,
          },
        };
        return state;
      },
  },
})

export const { setAuthState, setField } = authSlice.actions

export const authReducer = authSlice.reducer