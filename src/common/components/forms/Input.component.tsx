/* eslint-disable prettier/prettier */
import { Form, Input } from "antd"
import React from "react"
import { Rule } from "antd/es/form"

interface Props {
  label: string
  name: any
  value: any
  rule: Rule[]
  suffix?: React.ReactNode
  type: string
  placeholder?: string
  className?: any;
  onChange?: (e: any) => void,
}

export const CustomInput: React.FC<Props> = ({
  name,
  label,
  value,
  rule,
  type,
  suffix,
  placeholder,
  className,
  onChange
}) => {
  return (
    <Form.Item
      label={
        <span className="text-[#5C5C5C] font-[Epilogue-600]">{label}</span>
      }
      name={name}
      required
      rules={rule}
      validateTrigger={['onChange', 'onBlur']}
    >
      <Input
        type={type}
        placeholder={placeholder}
        className={`py-3 bg-[#F2F1F1!important] border-none rounded-none ${className}`}
        onChange={onChange}
        value={value}
        suffix={suffix}
      />
    </Form.Item>
  )
}
