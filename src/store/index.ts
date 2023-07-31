/* eslint-disable prettier/prettier */
import { setTheme, themeReducer } from "./slice/theme"
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { authReducer, setAuthState, setField } from "./slice/auth"
import {
  globalReducer,
  setAllGlobalState,
  setGlobalState,
} from "./slice/global"
import {
  authApi,
  useSignupMutation,
  useOtpVerificationMutation,
  useSigninMutation,
  useUploadProfileImageMutation,
} from "./apis/auth"

const reducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  global: globalReducer,
  theme: themeReducer,
})

export const store = configureStore({
  reducer,
  devTools: import.meta.env.PROD === false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware)
  },
})

export { setField, setAuthState, setGlobalState, setAllGlobalState, setTheme }
export {
  useSignupMutation,
  useOtpVerificationMutation,
  useSigninMutation,
  useUploadProfileImageMutation,
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
