/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { ModalComponent } from "../../../common/components/modal/modal.component"
import { Button, Col, Form, Row } from "antd"
import { CustomInput } from "../../../common/components/forms/Input.component"

interface Props {
  open: boolean
  handleCancel: () => void
  value: string
  title: any
  label: string
  name: string
  btnName: string
  formDesc?: any
  btnColor?: boolean
  disabled?: boolean
  onChange: any
  onFinish?: any
}

type RequiredMark = boolean | "optional"

export const TaskFormModal: React.FC<Props> = ({
  handleCancel,
  open,
  value,
  title,
  name,
  label,
  btnName,
  formDesc,
  btnColor,
  disabled,
  onChange,
  onFinish,
}) => {
  const [requiredMark] = useState<RequiredMark>("optional")
  return (
    <ModalComponent
      open={open}
      width={"30rem"}
      title={<div className="font-[Epilogue-600] dark:bg-[#0E0D0D] dark:text-[#ffffff] text-[1.2rem]">{title}</div>}
      footer={false}
      closable={false}
      handleCancel={handleCancel}
    >
      {formDesc && (
        <p className="font-[Epilogue-[400] text-[1rem] text-[#B8B6B6] mb-5">
          {formDesc}
        </p>
      )}
      <Form
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        fields={[
          {
            name,
            value,
          },
        ]}
        requiredMark={requiredMark}
      >
        <Row>
          <Col span={24}>
            <CustomInput
              label={label}
              name={name}
              rule={[{ required: true }]}
              type="text"
              value={value}
              className="text-[1rem] font-[Epilogue-400]"
              onChange={onChange}
            />
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
              className={`${
                btnColor && disabled
                  ? `bg-[#E1534130!important]`
                  : btnColor && !disabled
                  ? "bg-[#FF3535]"
                  : "bg-primary-color"
              } text-[#ffffff!important] border-none flex items-center justify-center py-5 rounded-none px-14 mx-auto font-[Epilogue-600] text-[1rem]`}
            >
              {btnName}
            </Button>
          </Col>
        </Row>
      </Form>
    </ModalComponent>
  )
}
