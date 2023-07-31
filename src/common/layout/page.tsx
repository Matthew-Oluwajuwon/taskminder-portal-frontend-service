/* eslint-disable prettier/prettier */
import React from "react"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"

export const PageLayout: React.FC = () => {
  const state = useAppSelector((state) => {
    return state.global
  })

  return (
    <div className="h-[100svh] bg-[#ffffff] dark:bg-[#303030] flex justify-center">
      <div
        className={`w-full max-w-[45rem] bg-[#F9F8F8]
         ${
           state.openDrawer ||
           state.openModal ||
           state.deleteTask ||
           state.openSubTask
             ? "dark:bg-[#1B1B1B40]"
             : "dark:bg-[#1B1B1B]"
         }
         h-full overflow-auto py-5 px-2 sm:px-10`}
      >
        <Outlet />
      </div>
    </div>
  )
}
