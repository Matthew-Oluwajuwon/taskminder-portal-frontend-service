/* eslint-disable prettier/prettier */
import { Col, Form, Row } from "antd"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { CustomInput } from "../../common/components/forms/Input.component"
import { SubmitButton } from "../../common/components/forms/submitButton.component"
import { formConfig } from "../../utils/form-config"
import { formMotion } from "../../utils/motion"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setField, useSigninMutation } from "../../store"
import useAuthentication from "../../custom-hooks/useAuthentication"

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })

  const [showPassword, setShowPassword] = useState(false)

  const [signin, { data, isLoading, isError, error }] = useSigninMutation();

  useAuthentication(data, isLoading, error, isError)

  return (
    <motion.div
      variants={formMotion()}
      initial="hidden"
      animate="show"
      className="grid place-content-center h-[95%] mx-10 lg:mx-12"
    >
      <h1 className="text-primary-color font-[Epilogue-600] text-[2rem]">
        Sign In
      </h1>
      <p className="text-[#B8B6B6] font-[Epilogue-400] mt-2 leading-relaxed">
        Continue creating, tracking and executing task the easy way with <br />
        <span className="text-primary-color font-medium">TaskMinder</span>
      </p>
      <Form
        className="lg:w-[75%] xl:w-[60%] mt-10"
        {...formConfig}
        onFinish={() => signin(state)}
        fields={[
          {
            name: "email",
            value: state.request?.email,
          },
          {
            name: "password",
            value: state.request?.password,
          },
        ]}
      >
        <Row>
          <Col span={24}>
            <CustomInput
              name="email"
              type="email"
              label="Enter Email Address"
              value={state.request?.email}
              onChange={(e) =>
                dispatch(setField({ key: "email", value: e.target.value }))
              }
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
              label="Enter Password"
              name="password"
              value={state.request?.password}
              rule={[{ required: true }]}
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                dispatch(setField({ key: "password", value: e.target.value }))
              }
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
          <Col span={24} className="text-right text-primary-color -mt-5 mb-10">
            <p className="cursor-pointer hover:scale-95 hover:transition-all">
              Forgot Password?
            </p>
          </Col>
          <Col span={24}>
            <SubmitButton label="Login" loading={isLoading} />
          </Col>
        </Row>
      </Form>
      <p className="text-[0.8rem] text-[#B8B6B6] font-[Epilogue-400] mt-2 text-center lg:text-left">
        Don't have a TaskMinder account?{" "}
        <Link
          to="/signup"
          className="font-bold text-primary-color cursor-pointer hover:scale-95 hover:transition-all"
        >
          Sign up
        </Link>{" "}
      </p>
    </motion.div>
  )
}
