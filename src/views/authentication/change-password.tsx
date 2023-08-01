/* eslint-disable prettier/prettier */
import { Col, Form, Popover, Row } from "antd"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { CustomInput } from "../../common/components/forms/Input.component"
import { SubmitButton } from "../../common/components/forms/submitButton.component"
import { formConfig } from "../../utils/form-config"
import { formMotion } from "../../utils/motion"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setField, useSignupMutation } from "../../store"
import { useAuthQuery } from "../../custom-hooks/useAuthQuery"
import useAuthentication from "../../custom-hooks/useAuthentication"
import { INITIALIZER_TYPE } from "../../utils/constants"
import PinInput from "react-pin-input"
import useUserInfo from "../../custom-hooks/useUserInfo"

export const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })
  const [showPassword, setShowPassword] = useState(false)
  const { setResetInputField, passwordValidator, contentData } = useAuthQuery()
  const [changePassword, { data, isLoading, isError, error }] =
    useSignupMutation()
  useAuthentication(data, isLoading, error, isError, INITIALIZER_TYPE.SIGNUP)

  const { userInfo } = useUserInfo()

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
        Authorize Change
      </h1>
      <p className="text-[#B8B6B6] font-[Epilogue-400] mt-2 leading-relaxed">
        We have sent a verification code to <span className="font-bold">{userInfo?.email}</span>,
        enter it to change password
      </p>
      <Form
        className="lg:w-[75%] xl:w-[60%] mt-10"
        {...formConfig}
        onFinish={() => changePassword(state)}
        fields={[
          {
            name: "otp",
            value: state.request?.otp,
          },
          {
            name: "password",
            value: state.request?.password,
          },
        ]}
      >
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <Form.Item
              label={
                <span className="text-[#5C5C5C] font-[Epilogue-600]">
                  Enter Code
                </span>
              }
              name="otp"
              className="flex items-center justify-start"
            >
              <PinInput
                length={6}
                type="numeric"
                focus={true}
                inputMode="number"
                inputStyle={{
                  borderColor: "#F2F1F1",
                  backgroundColor: "#F2F1F1",
                  margin: "0.2rem",
                }}
                onChange={(e) => dispatch(setField({ key: "otp", value: e }))}
                inputFocusStyle={{ borderColor: "#E15341" }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </Form.Item>
          </Col>
          <Popover content={content} trigger="focus" placement="top">
            <Col span={24}>
              <CustomInput
                label="Enter New Password"
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
          <Popover content={content} trigger="focus" placement="top">
            <Col span={24}>
              <CustomInput
                label="Confirm New Password"
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
          <Col xs={10} lg={24} className="mt-5 mx-auto">
            <SubmitButton label="Change Password" loading={isLoading} />
          </Col>
        </Row>
      </Form>
    </motion.div>
  )
}
