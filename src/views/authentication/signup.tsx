/* eslint-disable prettier/prettier */
import { Col, Form, Popover, Row } from "antd"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { CustomInput } from "../../common/components/forms/Input.component"
import { SubmitButton } from "../../common/components/forms/submitButton.component"
import { formConfig } from "../../utils/form-config"
import { formMotion } from "../../utils/motion"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setField, useSignupMutation } from "../../store"
import { useAuthQuery } from "../../custom-hooks/useAuthQuery"
import useAuthentication from "../../custom-hooks/useAuthentication"
import { INITIALIZER_TYPE } from "../../utils/constants"

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })
  const [showPassword, setShowPassword] = useState(false)
  const { setResetInputField, passwordValidator, contentData } = useAuthQuery()
  const [signup, { data, isLoading, isError, error }] = useSignupMutation()
  useAuthentication(data, isLoading, error, isError, INITIALIZER_TYPE.SIGNUP)

  const content = (
    <div className="grid gap-3">
      {contentData.map((item, index) => (
        <span key={index} className="flex gap-3 items-center">
          <img src={item.img} className="w-[1.50rem]" alt="checker-img" />
          <p>{item.text}</p>
        </span>
      ))}
    </div>
  )

  return (
    <motion.div
      variants={formMotion()}
      initial="hidden"
      animate="show"
      className="grid place-content-center h-[95%] mx-3 lg:mx-12"
    >
      <h1 className="text-primary-color font-[Epilogue-600] text-[2rem]">
        Sign Up
      </h1>
      <p className="text-[#B8B6B6] font-[Epilogue-400] mt-2 leading-relaxed">
        Create, track and execute task the easy way with{" "}
        <span className="text-primary-color"> TaskMinder</span>
      </p>
      <Form
        className="lg:w-[75%] xl:w-[60%] mt-10"
        {...formConfig}
        onFinish={() => signup(state)}
        fields={[
          {
            name: "email",
            value: state.request?.email,
          },
          {
            name: "password",
            value: state.request?.password,
          },
          {
            name: "username",
            value: state.request?.username,
          },
        ]}
      >
        <Row>
          <Col span={24}>
            <CustomInput
              name="email"
              type="email"
              label="Enter Email Address"
              onChange={(e) =>
                dispatch(setField({ key: "email", value: e.target.value }))
              }
              value={state.request?.email}
              rule={[
                {
                  required: true,
                  pattern: new RegExp(
                    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  ),
                  message: "Invalid Email",
                },
              ]}
            />
          </Col>
          <Col span={24}>
            <CustomInput
              name="username"
              type="text"
              label="Create Username"
              onChange={(e) =>
                dispatch(setField({ key: "username", value: e.target.value }))
              }
              value={state.request?.username}
              rule={[
                {
                  required: true,
                },
              ]}
              placeholder="e.g. matthewTheChef"
            />
          </Col>
          <Popover content={content} trigger="focus" placement="top">
            <Col span={24}>
              <CustomInput
                label="Create Password"
                name="password"
                onChange={(e) => setResetInputField(e.target.value, "password")}
                value={state.request?.password}
                rule={[{ required: true }, { validator: passwordValidator }]}
                type={showPassword ? "text" : "password"}
                suffix={
                  <span
                    className="font-bold text-[#5C5C5C] font-[Epilogue-500] px-3 cursor-pointer hover:scale-95 hover:transition-all"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                }
              />
            </Col>
          </Popover>
          <Col span={24}>
            <SubmitButton label="Create Account" loading={isLoading} />
          </Col>
        </Row>
      </Form>
      <p className="text-[0.8rem] text-[#B8B6B6] font-[Epilogue-400] mt-2 text-center lg:text-left">
        Already have a TaskMinder account?{" "}
        <Link
          to="/"
          className="font-bold text-primary-color cursor-pointer hover:scale-95 hover:transition-all"
        >
          Sign in
        </Link>{" "}
      </p>
    </motion.div>
  )
}
