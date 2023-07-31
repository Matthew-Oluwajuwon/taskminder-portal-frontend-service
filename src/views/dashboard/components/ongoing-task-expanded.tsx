/* eslint-disable prettier/prettier */
import React, { useCallback, useLayoutEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import BackIcon from "../../../assets/icons/back.svg"
import { motion } from "framer-motion"
import { Button, Checkbox, Typography } from "antd"
import { TaskFormModal } from "./task-form-modal"
import trash from "../../../assets/icons/trash.svg"
import { listMotion, staggeredChildren, staggeredListMotion } from "../../../utils/motion"
import { OngoingProps } from "../../../utils/dummy"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setGlobalState } from "../../../store"

export const OngoingTaskExpanded: React.FC = () => {
  const [inputValue, setInputValue] = useState("")
  const [subTasks, setSubTasks] = useState<string[]>([])
  const [subTask, setSubTask] = useState<string>()
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => {
    return state.global
  })
  const location = useLocation()
  useLayoutEffect(() => {
    document.title = "Ongoing Task | TaskMinder"
  }, [])

  const stateLocation: OngoingProps = location.state

  const onFinish = useCallback(() => {
    setSubTasks([...subTasks, subTask as string])
    dispatch(setGlobalState({key: "openSubTask", value: false}))
    setSubTask("")
  }, [dispatch, subTask, subTasks])

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
    <div className="lg:mt-10">
      <TaskFormModal
        open={state.openSubTask as boolean}
        value={subTask as string}
        handleCancel={() => dispatch(setGlobalState({key: "openSubTask", value: false}))}
        title="Add new sub-task"
        name="subTaskName"
        label="Sub-task Name"
        btnName={"Done"}
        onFinish={onFinish}
        onChange={(e: any) => setSubTask(e.target.value)}
      />
      <TaskFormModal
        open={state.openModal  as boolean}
        value={stateLocation.cardTitle}
        handleCancel={() => dispatch(setGlobalState({key: "openModal", value: false}))}
        title="Rename Task"
        name="taskName"
        label="Task Name"
        btnName={"Done"}
        onChange={() => {}}
      />
      <TaskFormModal
        open={state.deleteTask as boolean}
        value={inputValue}
        handleCancel={() => dispatch(setGlobalState({key: "deleteTask", value: false}))}
        title="Delete Task"
        formDesc={
          <span>
            Are you sure you want to permanently delete this task? Copy task
            name and paste below{" "}
            <b className="text-[#ff0000]">{stateLocation.cardTitle}</b>
          </span>
        }
        name="deleteTaskName"
        label="Enter Task Name"
        btnName={"Delete task"}
        btnColor={true}
        disabled={inputValue === stateLocation.cardTitle ? false : true}
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
          {stateLocation.cardTitle}
        </Typography.Paragraph>
        <Button
          type="text"
          className="text-primary-color hover:bg-[#F7E8E6!important] rounded-none py-5 px-3 flex justify-center items-center hover:text-[#E15341!important] -mt-5 font-[Epilogue-500] text-[1rem]"
          onClick={() => dispatch(setGlobalState({key: "openModal", value: true}))}
        >
          Rename
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.05rem] font-[Epilogue-500] dark:text-[#CDCBCB]">Sub-tasks</h1>
        <span className="flex gap-1 items-center dark:text-[#CDCBCB]">
          <span className={`font-semibold dark:text-[#CDCBCB]`} style={{ color: stateLocation.color }}>
            {stateLocation.percent}%
          </span>
          done
        </span>
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
            className="rounded-none border-none bg-[#ffffff] dark:bg-[#0E0D0D] p-3 flex justify-between mb-3 items-center"
          >
            <span className="flex items-start gap-3 text-[1rem] text-[#525252] dark:text-[#c4c4c4]">
              <Checkbox className="" />
              {subsTask}
            </span>
            <img src={trash} alt="" onClick={() => remove(index)} className="block md:hidden text-[1.3rem]"/>
            <Button
              type="text"
              onClick={() => remove(index)}
              className="text-[#FF3535] hover:bg-[#F7E8E6!important] rounded-none py-5 px-3 hidden md:flex justify-center items-center hover:text-[#E15341!important] font-[Epilogue-500] text-[1rem]"
            >
              remove sub-task
            </Button>
          </motion.div>
        ))}
      </motion.div>
      <div className="flex flex-wrap items-center gap-5 mx-auto justify-center mt-10">
        <Button
          type="primary"
          className="bg-[#F7E8E6] text-primary-color flex items-center justify-center py-5 rounded-none px-5 font-[Epilogue-600] text-[1rem]"
          onClick={() => dispatch(setGlobalState({key: "deleteTask", value: true}))}
        >
          Delete task
        </Button>
        <Button
          type="primary"
          className="bg-primary-color text-[#ffffff] flex items-center justify-center py-5 rounded-none px-5 font-[Epilogue-600] text-[1rem]"
          onClick={() => dispatch(setGlobalState({key: "openSubTask", value: true}))}
        >
          Add new sub-task
        </Button>
      </div>
    </div>
  )
}
