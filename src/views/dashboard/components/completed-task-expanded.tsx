/* eslint-disable prettier/prettier */
import React, { useLayoutEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import BackIcon from "../../../assets/icons/back.svg"
import { motion } from "framer-motion"
import { Button, Typography } from "antd"
import { TaskFormModal } from "./task-form-modal"
import checked from "../../../assets/icons/checked.svg"
import { listMotion, staggeredChildren, staggeredListMotion } from "../../../utils/motion"
import { CompletedProp } from "../../../utils/dummy"

export const CompletedTaskExpanded: React.FC = () => {
  const [deleteTask, setDeleteTask] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState("")
  const [subTasks] = useState<string[]>([
    "Change system design",
    "Upgrade dashboard charts",
    "Review pull requests",
    "Change system design",
    "Upgrade dashboard charts"
  ])
  const location = useLocation()
  useLayoutEffect(() => {
    document.title = "Completed Task | TaskMinder"
  }, [])

  const state: CompletedProp = location.state

  return (
    <div className="md:mt-10">
      <TaskFormModal
        open={deleteTask}
        value={inputValue}
        handleCancel={() => setDeleteTask(false)}
        title="Delete Task"
        formDesc={
          <span>
            Are you sure you want to permanently delete this task? Copy task
            name and paste below{" "}
            <b className="text-[#ff0000]">{state.cardTitle}</b>
          </span>
        }
        name="deleteTaskName"
        label="Enter Task Name"
        btnName={"Delete task"}
        btnColor={true}
        disabled={inputValue === state.cardTitle ? false : true}
        onChange={(e: any) => setInputValue(e.target.value)}
      />
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => window.history.back()}
        variants={listMotion()}
        initial="hidden"
        animate="show"
      >
        <img src={BackIcon} alt="" className="w-10" />
        <p className="text-primary-color text-[1.3rem] font-[Epilogue-500]">
          back
        </p>
      </motion.div>
      <div className="flex justify-between items-center mt-10">
        <Typography.Paragraph
          className="text-[1.3rem] font-[Epilogue-500] dark:text-[#CDCBCB]"
          ellipsis
        >
          {state.cardTitle}
        </Typography.Paragraph>
        <p className="text-[#5C5C5C] font-[Epilogue-400] text-[0.8rem]">
          {state.date}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.05rem] font-[Epilogue-500] dark:text-[#CDCBCB]">Sub-tasks</h1>
      </div>
      <motion.div
        variants={staggeredListMotion()}
        initial="hidden"
        animate="visible"
        className="mt-5"
      >
        {subTasks.map((subsTask, index) => (
          <motion.div
            variants={staggeredChildren}
            key={index}
            className="rounded-none border-none bg-[#ffffff] dark:bg-[#0E0D0D] p-5 flex justify-between mb-5 items-center"
          >
            <span className="flex items-center gap-3 text-[1rem] text-[#525252]">
              <img src={checked} alt="" />
              {subsTask}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <div className="flex items-center gap-5 mx-auto justify-center mt-10">
        <Button
          type="primary"
          className="bg-[#F7E8E6] text-primary-color flex items-center justify-center py-5 rounded-none px-5 font-[Epilogue-600] text-[1rem]"
          onClick={() => setDeleteTask(true)}
        >
          Delete task
        </Button>
      </div>
    </div>
  )
}
