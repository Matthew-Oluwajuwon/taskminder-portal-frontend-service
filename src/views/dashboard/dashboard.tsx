/* eslint-disable prettier/prettier */
import React, { useEffect, useLayoutEffect, useState } from "react"
import Avatar from "../../assets/icons/gravitar.svg"
import { Button, Drawer, Image, Tabs, Upload } from "antd"
import { useNavigate } from "react-router-dom"
import { ListCard } from "./components/List-card"
import {
  ongoingItems,
  upcomingItems,
  completedItems,
  pendingItems,
} from "../../utils/dummy"
import { ROUTE_NAMES } from "../../utils/constants"
import ThemeSwitcher from "../../common/components/theme-switcher/themeSwitcher"
import useUserInfo from "../../custom-hooks/useUserInfo"
import { BsCalendar } from "react-icons/bs"
import { useSetRequest } from "../../custom-hooks/useSetRequest"
import { useUploadProfileImageMutation } from "../../store"
import useAuthentication from "../../custom-hooks/useAuthentication"
import { useAppSelector,useAppDispatch } from "../../store/hooks"
import { CustomInput } from "../../common/components/forms/Input.component"
import { setField } from "../../store"
import {motion} from "framer-motion"
import {formMotion} from "../../utils/motion"


export const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    document.title = "Dashboard | TaskMinder"
  }, [])
  const { userInfo } = useUserInfo()
  const { auth } = useAppSelector((state) => {
    return state
  })
  const date = new Date().toUTCString().slice(5, 16)
  const [tabKey, setTabKey] = useState<string>("1")
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  //state variable to control if the edit profile section is showing or not
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false)

  const handleTabChange = (e: string) => {
    setTabKey(e)
  }

  const tabItems = [
    {
      key: "1",
      name: (
        <div
          key={"1"}
          className={`flex items-center gap-1 ${
            tabKey === "1"
              ? "text-[#000000] dark:text-[#CDCBCB]"
              : "text-[#A09F9F]"
          } font-[Epilogue-500]`}
        >
          Ongoing{" "}
          <div
            className={`w-[17px] h-[17px] rounded-full flex items-center justify-center text-[#ffffff] ${
              tabKey === "1" ? "bg-primary-color" : "bg-[#A09F9F]"
            } text-[0.6rem]`}
          >
            16
          </div>
        </div>
      ),
      item: (
        <ListCard
          items={ongoingItems}
          keys="1"
          cardUrl={`/dashboard/ongoing-task?task=`}
        />
      ),
    },
    {
      key: "2",
      name: (
        <div
          key="2"
          className={`flex items-center gap-1 ${
            tabKey === "2"
              ? "text-[#000000] dark:text-[#CDCBCB]"
              : "text-[#A09F9F]"
          } font-[Epilogue-500]`}
        >
          Upcoming{" "}
          <div
            className={`w-[17px] h-[17px] rounded-full flex items-center justify-center text-[#ffffff] ${
              tabKey === "2" ? "bg-primary-color" : "bg-[#A09F9F]"
            } text-[0.6rem]`}
          >
            12
          </div>
        </div>
      ),
      item: (
        <ListCard
          keys="2"
          items={upcomingItems}
          cardUrl={`/dashboard/upcoming-task?task=`}
        />
      ),
    },
    {
      key: "3",
      name: (
        <div
          key={"3"}
          className={`flex items-center gap-1 ${
            tabKey === "3"
              ? "text-[#000000] dark:text-[#CDCBCB]"
              : "text-[#A09F9F]"
          } font-[Epilogue-500]`}
        >
          Completed{" "}
          <div
            className={`w-[17px] h-[17px] rounded-full flex items-center justify-center text-[#ffffff] ${
              tabKey === "3" ? "bg-primary-color" : "bg-[#A09F9F]"
            } text-[0.6rem]`}
          >
            24
          </div>
        </div>
      ),
      item: (
        <ListCard
          keys="3"
          items={completedItems}
          cardUrl={`/dashboard/completed-task?task=`}
        />
      ),
    },
    {
      key: "4",
      name: (
        <div
          key={"4"}
          className={`flex items-center gap-1 ${
            tabKey === "4"
              ? "text-[#000000] dark:text-[#CDCBCB]"
              : "text-[#A09F9F]"
          } font-[Epilogue-500]`}
        >
          Pending{" "}
          <div
            className={`w-[17px] h-[17px] rounded-full flex items-center justify-center text-[#ffffff] ${
              tabKey === "4" ? "bg-primary-color" : "bg-[#A09F9F]"
            } text-[0.6rem]`}
          >
            2
          </div>
        </div>
      ),
      item: <ListCard keys="4" items={pendingItems} />,
    },
  ].map((items) => ({
    key: items.key,
    label: items.name,
    children: items.item,
  }))

  const navigate = useNavigate()
  const { loading, prop } = useSetRequest()

  const [uploadProfile, { data, isError, isLoading, error }] =
    useUploadProfileImageMutation()
  useAuthentication(data, isLoading, error, isError)

  useEffect(() => {
    if (auth.request?.profileImage) {
      uploadProfile(auth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadProfile, auth.request.profileImage])

  return (
    <>
      <header className="flex justify-between items-start mt-2 md:mt-8">
        <div
          onClick={() => setOpenDrawer(true)}
          className="flex items-start sm:items-center justify-center gap-3 cursor-pointer hover:scale-95 hover:transition-all"
        >
          <section>
            <img
              src={userInfo.profileImage ? userInfo.profileImage : Avatar}
              alt=""
              className="w-20 h-20 rounded-full hover:scale-110 hover:transition-all object-contain"
            />
          </section>
          <section>
            <h1 className="text-primary-color font-[Epilogue-500] text-[0.9rem] md:text-[1.2rem] sm:-mt-5">
              Aloha👋🏽 {userInfo.username}
            </h1>
            <p className="font-[Epilogue-400] text-[0.8rem] text-[#B8B6B6]">
              A new day to create, track and execute!
            </p>
          </section>
        </div>
        <span className="text-[#303030] dark:text-[#CDCBCB] font-[Epilogue-500] text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] flex items-start gap-2">
          <BsCalendar /> {date}
        </span>
      </header>
      <Drawer
        open={openDrawer}
        width={window.innerWidth > 992 ? "55%" : "75%"}
        closable={false}
        placement="left"
        onClose={() => setOpenDrawer(false)}
      >
        <div className="flex flex-col items-end float-right relative w-full h-full lg:w-[50%] dark:bg-[#1B1B1B] p-5 py-5 lg:py-14 text-sm">
          <div className="overflow-auto w-full">
            <div className="flex items-center justify-between">
              <section className="flex items-center gap-3">
                <Image
                  src={
                    userInfo?.profileImage
                      ? userInfo?.profileImage
                      : auth.request?.profileImage
                      ? auth.request?.profileImage
                      : Avatar
                  }
                  alt=""
                  className="w-[5rem!important] h-20 rounded-full object-contain"
                  preview
                />
                <h1 className="text-primary-color font-[Epilogue-500] text-[0.9rem] md:text-[1.2rem]">
                  {userInfo.username}
                </h1>
              </section>
              <ThemeSwitcher />
            </div>
            <Upload {...prop}>
              <Button
                type="primary"
                className="bg-[#F7E8E6] mt-6 text-primary-color flex items-center justify-center py-5 rounded-none px-5 font-[Epilogue-600] text-[1rem] hover:scale-90"
                loading={loading}
              >
                Upload Profile Image
              </Button>
            </Upload>
            <div className="mt-10 leading-loose text-[#000000] dark:text-[#ffffff]">
          
              {/* check if isEditingProfile === true before rendering the edit profile section and render just personal information if it is false */}
              {isEditingProfile ? (
             <> <h1 className="font-[Epilogue-500] text-[1.1rem] mb-1">
               Edit Personal Information
              </h1> <motion.div className=" mt-4"  variants={formMotion()}
                initial="hidden"
                animate="show">
                <div className="flex gap-2">
                  <CustomInput
                    name="username"
                    type="text"
                    label="Edit Username"
                    onChange={(e) =>
                      dispatch(setField({ key: "username", value: e.target.value }))
                    }
                    value={userInfo.username}
                    rule={[
                      {
                        required: true,
                      },
                    ]}
                    placeholder="e.g. matthewTheChef"
                  />  
                  <CustomInput 
                    name="email"
                    type="email"
                    label="Edit Email Address"  
                    onChange={(e) =>
                      dispatch(setField({ key: "email", value: e.target.value }))
                    }
                    value={userInfo.email}
                    rule={[
                    {
                      required: true,
                      pattern: new RegExp(
                        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                      ),
                      message: "Invalid Email",
                    },
                  ]}/>
                </div>
              <div className="py-2 flex gap-4 items-center">
                {/* button to set isEditing to false so as remove the section from the dom */}
                <Button
              type="primary"
              className="text-[#F7E8E6] bg-primary-color flex items-center justify-center py-2 md:py-5 -px-2 rounded-none font-[Epilogue-600] text-[1rem]"
              onClick={() =>{setIsEditingProfile(false)}}
            >
              Cancel
              </Button>
                <Button
              type="primary"
              className="bg-[#F7E8E6] text-primary-color flex items-center justify-center py-2 md:py-5 -px-2 rounded-none font-[Epilogue-600] text-[1rem]"
              // onClick={() =>{}}
            >
              Save
              </Button>
              </div>
              </motion.div></>) : (<>
                  <h1 className="font-[Epilogue-500] text-[1.1rem] mb-1">
                Personal Information
              </h1>
              <div className="text-[#5C5C5C] dark:text-[#ffffff] font-[Epilogue-400] text-[0.8rem]">
                  <h2 className="grid lg:flex items-center justify-between">
                    Username:&nbsp;{" "}
                    <span className="text-[#000000] dark:text-[#ffffff]">
                      {userInfo.username}
                    </span>
                  </h2>
                  <h2 className="grid lg:flex items-center justify-between">
                    Email Address:&nbsp;{" "}
                    <span className="text-[#000000] dark:text-[#ffffff]">
                      {userInfo.email}
                    </span>
                  </h2>
                  {/* toggler button to show or hide edit section */}
                <button className="text-primary-color w-fit cursor-pointer text-[0.8rem] 
                font-[Epilogue-400]" onClick={()=>{setIsEditingProfile(!isEditingProfile)}}>
                  Edit
                </button>
              </div>
              </>)}
              <div className="mt-10 leading-loose">
                <h1 className="font-[Epilogue-500] text-[#000000] dark:text-[#ffffff] text-[1.1rem] mb-1">
                  Security
                </h1>
                <div className="text-[#5C5C5C] dar:text-[#ffffff] font-[Epilogue-400] text-[0.8rem]">
                  <h2 className="grid lg:flex items-center justify-between text-[#000000] dark:text-[#ffffff]">
                    Password:&nbsp;{" "}
                    <span className="text-[#E15341] cursor-pointer">
                      Change Password
                    </span>
                  </h2>
                </div>
              </div>
              <div className="mt-10 leading-loose">
                <h1 className="font-[Epilogue-500] text-[#000000] dark:text-[#ffffff] text-[1.1rem] mb-1">
                  Statistics
                </h1>
                <div className="text-[#5C5C5C] dark:text-[#ffffff] font-[Epilogue-400] text-[0.8rem]">
                  <h2 className="flex items-center justify-between">
                    Total Number of Task:&nbsp;{" "}
                    <span className="text-[#000000] dark:text-[#ffffff] cursor-pointer font-bold">
                      64
                    </span>
                  </h2>
                  <h2 className="flex items-center justify-between">
                    Number of Ongoing Task:&nbsp;{" "}
                    <span className="text-[#000000] dark:text-[#ffffff] cursor-pointer">
                      12
                    </span>
                  </h2>
                  <h2 className="flex items-center justify-between">
                    Number of Upcoming Task:&nbsp;{" "}
                    <span className="text-[#000000] dark:text-[#ffffff] cursor-pointer">
                      38
                    </span>
                  </h2>
                  <h2 className="flex items-center justify-between">
                    Number of Completed Task:&nbsp;{" "}
                    <span className="text-[#000000] dark:text-[#ffffff] cursor-pointer">
                      8
                    </span>
                  </h2>
                  <h2 className="flex items-center justify-between">
                    Number of Pending Task:&nbsp;{" "}
                    <span className="text-[#ff0000] cursor-pointer">2</span>
                  </h2>
                  <Button
                    type="text"
                    className="bg-[#F7E8E6] text-primary-color mt-3 flex md:hidden items-center justify-end float-right py-5 rounded-none px-5 font-[Epilogue-600] text-[1rem]"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="primary"
            className="bg-[#F7E8E6] mb-5 mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 text-primary-color hidden md:flex items-center justify-center py-5 rounded-none px-5 font-[Epilogue-600] text-[1rem]  hover:scale-90"
          >
            Logout
          </Button>
        </div>
      </Drawer>
      <main className="my-5">
        <h1 className="text-[#000000] dark:text-[#CDCBCB] font-[Epilogue-500] text-[1.2rem]">
          My tasks
        </h1>
        <div className="my-5">
          <div className="flex items-center justify-between relative">
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              onChange={handleTabChange}
              className="w-full"
            />
            <Button
              type="primary"
              className="bg-[#F7E8E6] absolute right-2 -top-14 md:top-2 text-primary-color flex items-center justify-center py-2 md:py-5 -px-2 rounded-none font-[Epilogue-600] text-[1rem]"
              onClick={() =>
                navigate(ROUTE_NAMES.PROTECTED_ROUTES.CREATE_NEW_TASK)
              }
            >
              Create new task
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
