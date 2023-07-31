/* eslint-disable prettier/prettier */
import React, { useEffect, useLayoutEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Logo from "../../assets/images/logo.svg"
import Favi from "../../assets/icons/favicon.svg"
import { AuthPageSideText, ROUTE_NAMES } from "../../utils/constants"
import Typewriter from "typewriter-effect"
import BackIcon from "../../assets/icons/back.svg"
import { useAppSelector } from "../../store/hooks"

const AuthLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.pathname === "/"
  const { global } = useAppSelector((state) => {
    return state
  })
  useLayoutEffect(() => {
    document.title =
    location.pathname === ROUTE_NAMES.AUTHENTICATION?.SIGN_IN
        ? "Sign in | TaskMinder"
        : location.pathname === ROUTE_NAMES.AUTHENTICATION?.SIGN_UP
        ? "Sign Up | TaskMinder"
        : location.pathname === ROUTE_NAMES.AUTHENTICATION?.OTP_VERIFICATION
        ? "OTP Verification | TaskMinder"
        : ""
  }, [global.isChangingPassword, location.pathname, navigate])
  
  useEffect(() => {
    
    if (sessionStorage.getItem("***") && !global.isChangingPassword) {
      return navigate(ROUTE_NAMES.PROTECTED_ROUTES.DASHBOARD, { replace: true })
    }
  }, [global.isChangingPassword, navigate])
  

  return (
    <div className="h-[100svh] grid grid-cols-1 lg:grid-cols-2">
      <section className="bg-primary-color p-[3rem] hidden md:block">
        <img src={Logo} alt="logo" />
        <div className="font-[Epilogue-600] text-[#ffffff] text-[3.5rem] sm:text-[5rem] lg:w-[60%] mt-24 leading-none">
          <Typewriter
            options={{
              strings: data ? AuthPageSideText.Signin : AuthPageSideText.Signup,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between py-3">
          <div className="flex md:hidden items-center justify-center font-[Epilogue-800] ">
            <img src={Favi} alt="logo" className="w-10" />
            TaskMinder
          </div>
          <div
            className={`${
              data ? "hidden" : "flex"
            } md:hidden items-center justify-center gap-1 mr-2 cursor-pointer hover:scale-90 hover:transition-all`}
            onClick={() => window.history.back()}
          >
            <img src={BackIcon} alt="" className="w-7" />
            <p className="text-primary-color text-[1.2rem] font-[Epilogue-500]">
              back
            </p>
          </div>
        </div>
        <Outlet />
      </section>
    </div>
  )
}

export default AuthLayout
