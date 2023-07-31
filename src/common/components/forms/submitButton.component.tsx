/* eslint-disable prettier/prettier */
import { Button } from "antd"
import React from "react"

interface Props {
  label: string
  loading?: boolean
}

export const SubmitButton: React.FC<Props> = ({ label, loading }) => {  
  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={loading}
      className="bg-primary-color rounded-none flex items-center justify-center py-5 font-[Epilogue-600]"
      block
    >
      {label}
    </Button>
  )
}
