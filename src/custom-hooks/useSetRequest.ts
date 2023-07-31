/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setAllGlobalState, setField } from "../store"
import { Form, UploadProps } from "antd"
import Notify from "../common/components/notification/notify"
import { FORM_METHODS, NOTIFICATION_TYPE } from "../utils/constants"
import { TypeOptions } from "react-toastify"
import { RcFile } from "antd/es/upload"
import React from "react"

export const useSetRequest = () => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { global, auth } = useAppSelector((state) => {
    return state
  })
  const values = Form.useWatch([], form)
  const [submittable, setSubmittable] = React.useState(false)

  useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      },
    )
  }, [form, values])

  const setRequest = useCallback(
    (value: any, key: keyof any) => {
      dispatch(
        setAllGlobalState({
          ...global,
          createNewTask: {
            ...global.createNewTask,
            [key]: value,
          },
        }),
      )
    },
    [dispatch, global],
  )

  const [loading, setLoading] = useState(false)

  const formData = new FormData()
  const prop: UploadProps = {
    name: "file",
    maxCount: 1,
    fileList: undefined,
    accept: ".jpg, .jpeg, .png",
    customRequest: (options: any) => {
      if (options.file?.size < 1000000) {
        formData.append("upload_preset", "profileImage")
        formData.append("file", options.file as RcFile)
        setLoading(true)
        fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL as string, {
          method: FORM_METHODS.POST,
          body: formData,
        })
          .then((res) => res.json())
          .then((response) => {
            dispatch(
              setField({ key: "profileImage", value: response.secure_url }),
            )
            setLoading(false)
          })
          .catch((err) => {
            Notify(NOTIFICATION_TYPE.ERROR as TypeOptions, err?.message)
            setLoading(false)
          })
      } else {
        Notify(NOTIFICATION_TYPE.ERROR as TypeOptions, "Image larger than 2mb")
        setRequest(null, "profileImage")
      }
    },
    onChange: (info) => {
      if (auth.request.profileImage !== null) {
        info.file.status = "done"
      }
    },
  }

  return {
    setRequest,
    form,
    submittable,
    prop,
    loading,
  }
}
