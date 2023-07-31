/* eslint-disable prettier/prettier */
import { Col, Form, Row } from "antd"
import { motion } from "framer-motion"
import React, { useLayoutEffect } from "react"
import BackIcon from "../../assets/icons/back.svg"
import PinInput from "react-pin-input"
import { SubmitButton } from "../../common/components/forms/submitButton.component"
import { formMotion } from "../../utils/motion"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setField, useOtpVerificationMutation } from "../../store"
import useUserInfo from "../../custom-hooks/useUserInfo"
import { formConfig } from "../../utils/form-config"
import useAuthentication from "../../custom-hooks/useAuthentication"

export const OTPVerification: React.FC = () => {
  useLayoutEffect(() => {
    document.title = "OTP Verification | TaskMinder"
  }, [])
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })
  const { userInfo } = useUserInfo()
  const [otpVerification, { data, isError, isLoading, error }] =
    useOtpVerificationMutation()
  useAuthentication(data, isLoading, error, isError)

  return (
    <div className="grid">
      <div
        className="hidden lg:flex items-center justify-start gap-3 m-10 lg:m-12 cursor-pointer hover:scale-90 hover:transition-all"
        onClick={() => window.history.back()}
      >
        <img src={BackIcon} alt="" />
        <p className="text-primary-color text-[1.2rem] font-[Epilogue-500]">
          back
        </p>
      </div>
      <motion.div
        variants={formMotion()}
        initial="hidden"
        animate="show"
        className="grid place-content-center m-5 lg:m-12"
      >
        <h1 className="text-primary-color font-[Epilogue-600] text-[2rem] text-center lg:text-left">
          Verify Account
        </h1>
        <p className="text-[#B8B6B6] font-[Epilogue-400] mt-2 leading-relaxed w-full md:w-1/2 lg:w-full text-center lg:text-left mx-auto lg:mx-0">
          We have sent a verification code to{" "}
          <span className="font-semibold">{userInfo.email}</span>, enter it to
          complete your sign up process
        </p>
        <Form
          className="lg:w-[80%] xl:w-[65%] w-full mt-10 lg:mx-0"
          {...formConfig}
          onFinish={() => otpVerification(state)}
          fields={[
            {
              name: "otp",
              value: state.request?.otp,
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
                className="flex items-center justify-center lg:justify-start"
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
            <Col xs={10} lg={24} className="mt-5 mx-auto">
              <SubmitButton label="Verify Account" loading={isLoading} />
            </Col>
          </Row>
        </Form>
      </motion.div>
    </div>
  )
}
