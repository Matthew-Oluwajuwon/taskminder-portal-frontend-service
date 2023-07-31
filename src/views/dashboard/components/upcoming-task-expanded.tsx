/* eslint-disable prettier/prettier */
import React, { useCallback, useLayoutEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import BackIcon from "../../../assets/icons/back.svg"
import { motion } from "framer-motion"
import { Button, Typography } from "antd"
import { TaskFormModal } from "./task-form-modal"
import { listMotion, staggeredChildren, staggeredListMotion } from "../../../utils/motion"
import { UpcomingProp } from "../../../utils/dummy"

export const UpcomingTaskExpanded: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openSubTask, setOpenSubTask] = useState<boolean>(false)
  const [deleteTask, setDeleteTask] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState("")
  const [subTasks, setSubTasks] = useState<string[]>([])
  const [subTask, setSubTask] = useState<string>("")
  const location = useLocation()
  useLayoutEffect(() => {
    document.title = "Upcoming Task | TaskMinder"
  }, [])

  const state: UpcomingProp = location.state

  const onFinish = useCallback(() => {
    setSubTasks([...subTasks, subTask as string])
    setOpenSubTask(false)
    setSubTask("")
  }, [subTask, subTasks])

  const remove = useCallback(
    (id: number) => {
      setSubTasks(
        subTasks.filter((_x, i) => {
          return i !== id
        }),
      )
    },
    [subTasks],
  )

  return (
    <div className="mt-10">
      <TaskFormModal
        open={openSubTask}
        value={subTask as string}
        handleCancel={() => setOpenSubTask(false)}
        title="Add new sub-task"
        name="subTaskName"
        label="Sub-task Name"
        btnName={"Done"}
        onFinish={onFinish}
        onChange={(e: any) => setSubTask(e.target.value)}
      />
      <TaskFormModal
        open={openModal}
        value={state.cardTitle}
        handleCancel={() => setOpenModal(false)}
        title="Rename Task"
        name="taskName"
        label="Task Name"
        btnName={"Done"}
        onChange={() => {}}
      />
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
        initial="idden"
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
        <Button
          type="text"
          className="text-primary-color hover:bg-[#F7E8E6!important] rounded-none py-5 px-3 flex justify-center items-center hover:text-[#E15341!important] -mt-5 font-[Epilogue-500] text-[1rem]"
          onClick={() => setOpenModal(true)}
        >
          Rename
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.05rem] font-[Epilogue-500] dark:text-[#CDCBCB]">Sub-tasks</h1>
        <p className="text-[#5C5C5C] font-[Epilogue-400] text-[0.8rem]">
          {state.date}
        </p>
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
              {subsTask}
            </span>
            <Button
              type="text"
              onClick={() => remove(index)}
              className="text-[#FF3535] hover:bg-[#F7E8E6!important] rounded-none py-5 px-3 flex justify-center items-center hover:text-[#E15341!important] font-[Epilogue-500] text-[1rem]"
            >
              remove sub-task
            </Button>
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
        <Button
          type="primary"
          className="bg-primary-color text-[#ffffff] flex items-center justify-center py-5 rounded-none px-5 font-[Epilogue-600] text-[1rem]"
          onClick={() => setOpenSubTask(true)}
        >
          Add new sub-task
        </Button>
      </div>
    </div>
  )
}
