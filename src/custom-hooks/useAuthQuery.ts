/* eslint-disable prettier/prettier */
import { useCallback } from "react"
import GrayChecker from "../assets/icons/gray-check.svg"
import GreenCheck from "../assets/icons/green-check.svg"
import RedCheck from "../assets/icons/red-check.svg"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setAuthState, setField } from "../store"
import { ApiRequest } from "../models/client/request"

export const useAuthQuery = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })
  const setResetInputField = useCallback(
    (value: any, key: keyof ApiRequest.Auth) => {
      const UpperCase = /(?=.*[A-Z])/
      const LowerCase = /(?=.*[a-z])/
      const NumberCase = /(?=.*[0-9])/
      const SpecialChar = /([^A-Za-z0-9])/
      if (value?.length < 8) {
        dispatch(setAuthState({ key: "isPasswordLength", value: false }))
      } else {
        dispatch(setAuthState({ key: "isPasswordLength", value: true }))
      }
      dispatch(setField({ key, value }))
      dispatch(
        setAuthState({ key: "isUpperCase", value: UpperCase.test(value) }),
      )
      dispatch(
        setAuthState({ key: "isLowerCase", value: LowerCase.test(value) }),
      )
      dispatch(
        setAuthState({ key: "hasNumber", value: NumberCase.test(value) }),
      )
      dispatch(
        setAuthState({ key: "isSpecialChar", value: SpecialChar.test(value) }),
      )
    },
    [dispatch],
  )

  const passwordValidator = () => {
    if (!state.isUpperCase) {
      return Promise.reject()
    } else if (!state.isLowerCase) {
      return Promise.reject()
    } else if (!state.hasNumber) {
      return Promise.reject()
    } else if (!state.isPasswordLength) {
      return Promise.reject()
    } else if (!state.isSpecialChar) {
      return Promise.reject()
    } else {
      return Promise.resolve()
    }
  }

  const contentData = [
    {
      text: "Minimum number of characters: 8",
      img:
        state.request?.password === ""
          ? GrayChecker
          : state.request?.password === undefined
          ? GrayChecker
          : state.isPasswordLength
          ? GreenCheck
          : RedCheck,
    },
    {
      text: "Contains a capital letter",
      img:
        state.request?.password === ""
          ? GrayChecker
          : state.request?.password === undefined
          ? GrayChecker
          : state.isUpperCase
          ? GreenCheck
          : RedCheck,
    },
    {
      text: "Contains a lowercase letter",
      img:
        state.request?.password === ""
          ? GrayChecker
          : state.request?.password === undefined
          ? GrayChecker
          : state.isLowerCase
          ? GreenCheck
          : RedCheck,
    },
    {
      text: "Contains a number",
      img:
        state.request?.password === ""
          ? GrayChecker
          : state.request?.password === undefined
          ? GrayChecker
          : state.hasNumber
          ? GreenCheck
          : RedCheck,
    },
    {
      text: "Includes a special character",
      img:
        state.request?.password === ""
          ? GrayChecker
          : state.request?.password === undefined
          ? GrayChecker
          : state.isSpecialChar
          ? GreenCheck
          : RedCheck,
    },
  ]

  return {
    setResetInputField,
    passwordValidator,
    contentData,
  }
}
