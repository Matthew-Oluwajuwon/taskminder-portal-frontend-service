/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { endpoints } from "../endpoints.config"
import { FORM_METHODS } from "../../utils/constants"
import { State } from "../../models/application/state"

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_BASE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("***");
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => {
    return {
      signup: build.mutation({
        query: (data: State.Auth) => {
          return {
            url: endpoints.auth.signup,
            method: FORM_METHODS.POST,
            body: {
              email: data.request?.email,
              password: data.request?.password,
              username: data.request?.username,
            },
          }
        },
      }),
      otpVerification: build.mutation({
        query: (data: State.Auth) => {
          return {
            url: endpoints.auth.otpVerification,
            method: FORM_METHODS.POST,
            body: {
              otp: data.request?.otp,
            },
          }
        },
      }),
      signin: build.mutation({
        query: (data: State.Auth) => {
          return {
            url: endpoints.auth.signin,
            method: FORM_METHODS.POST,
            body: {
              email: data.request.email,
              password: data.request.password
            }
          }
        }
      }),
      uploadProfileImage: build.mutation({
        query: (data: State.Auth) => {
          return {
            url: endpoints.auth.uploadProfileImage,
            method: FORM_METHODS.POST,
            body: {
              profileImage: data.request.profileImage
            }
          }
        }
      })
    }
  },
})

export const { useSignupMutation, useOtpVerificationMutation, useSigninMutation, useUploadProfileImageMutation } = authApi
export { authApi }
