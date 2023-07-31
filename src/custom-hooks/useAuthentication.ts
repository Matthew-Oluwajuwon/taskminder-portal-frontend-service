/* eslint-disable prettier/prettier */
import { useCallback, useEffect } from "react"
import { Apiresponse } from "../models/client/response"
import Notify from "../common/components/notification/notify"
import {
  INITIALIZER_TYPE,
  NOTIFICATION_TYPE,
  ROUTE_NAMES,
} from "../utils/constants"
import { TypeOptions } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react"
import { SerializedError } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setAllGlobalState } from "../store"
import { Encryption } from "../common/components/encryption/encryption"

const useAuthentication = (
  data: any,
  isLoading: boolean,
  error: FetchBaseQueryError | SerializedError | undefined,
  isError: boolean,
  initializer?: string,
) => {
  const navigate = useNavigate()
  const state = useAppSelector((state) => {
    return state.global
  })
  const dispatch = useAppDispatch()
  const authenticate = useCallback(() => {
    const response: Apiresponse.API = data
    if (data && !isLoading) {
      Notify(
        NOTIFICATION_TYPE.SUCCESS as TypeOptions,
        response?.responseMessage as string,
      )
      dispatch(
        setAllGlobalState({
          ...state,
          userInfo: response.data,
        }),
        )
        
        sessionStorage.setItem("*****", Encryption.encrypt(response.data))
        if (response.data?.token) {
          sessionStorage.setItem("***", response.data?.token)
        }
      
      setTimeout(() => {
        navigate(
          initializer === INITIALIZER_TYPE.SIGNUP || !response.data?.isVerified
            ? ROUTE_NAMES.AUTHENTICATION.OTP_VERIFICATION
            :  ROUTE_NAMES.PROTECTED_ROUTES.DASHBOARD,
          {
            replace: true,
          },
        )
      }, 1000);
    } else if (isError) {
      if ("data" in error!) {
        const err: Apiresponse.API = error?.data as Apiresponse.API
        // Access the 'data' property safely
        Notify(
          NOTIFICATION_TYPE.ERROR as TypeOptions,
          err?.responseMessage as string,
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch, error, initializer, isError, isLoading, navigate])

  useEffect(() => {
    authenticate()
  }, [authenticate])
}

export default useAuthentication
